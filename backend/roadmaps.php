<?php
/**
 * CYVE - Operational Roadmaps
 */
include 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$role = $_SESSION['role'];
$username = $_SESSION['username'];

$message = '';

// Handle roadmap creation
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['create_roadmap'])) {
    $title = sanitize($_POST['title']);
    $description = sanitize($_POST['description']);
    $steps_array = explode("\n", $_POST['steps']);
    $steps = json_encode(array_filter(array_map('trim', $steps_array)));

    $stmt = $conn->prepare("INSERT INTO roadmaps (title, description, steps, created_by) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $title, $description, $steps, $user_id);
    if ($stmt->execute()) {
        $message = 'Strategic roadmap deployed successfully.';
        log_activity($user_id, 'create_roadmap', "Created roadmap: $title");
    }
    $stmt->close();
}

// Handle roadmap update
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_roadmap'])) {
    $id = $_POST['id'];
    $title = sanitize($_POST['title']);
    $description = sanitize($_POST['description']);
    $steps_array = explode("\n", $_POST['steps']);
    $steps = json_encode(array_filter(array_map('trim', $steps_array)));

    $stmt = $conn->prepare("SELECT created_by FROM roadmaps WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $roadmap = $result->fetch_assoc();
        if ($roadmap['created_by'] == $user_id || $role == 'admin') {
            $stmt = $conn->prepare("UPDATE roadmaps SET title = ?, description = ?, steps = ? WHERE id = ?");
            $stmt->bind_param("sssi", $title, $description, $steps, $id);
            if ($stmt->execute()) {
                $message = 'Strategy updated.';
                log_activity($user_id, 'update_roadmap', "Updated roadmap ID: $id");
            }
        }
    }
    $stmt->close();
}

// Handle roadmap deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = $_GET['delete'];
    $stmt = $conn->prepare("SELECT created_by FROM roadmaps WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $roadmap = $result->fetch_assoc();
        if ($roadmap['created_by'] == $user_id || $role == 'admin') {
            $stmt = $conn->prepare("DELETE FROM roadmaps WHERE id = ?");
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                $message = 'Strategy archived.';
                log_activity($user_id, 'delete_roadmap', "Deleted roadmap ID: $id");
            }
        }
    }
    $stmt->close();
}

// Fetch roadmaps
$search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
$query = "SELECT r.*, u.username as creator FROM roadmaps r LEFT JOIN users u ON r.created_by = u.id WHERE 1";
if ($search) {
    $query .= " AND (r.title LIKE '%$search%' OR r.description LIKE '%$search%')";
}
$query .= " ORDER BY r.created_at DESC";
$result = $conn->query($query);
$roadmaps = $result->fetch_all(MYSQLI_ASSOC);

// Get specific roadmap for editing
$edit_roadmap = null;
if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
    $id = $_GET['edit'];
    $stmt = $conn->prepare("SELECT * FROM roadmaps WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $edit_roadmap = $result->fetch_assoc();
        if ($edit_roadmap['created_by'] != $user_id && $role != 'admin') {
            $edit_roadmap = null;
        }
    }
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roadmaps - CYVE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles.css">
    <style>
        .dashboard-container { max-width: 1200px; margin: 4rem auto; padding: 0 2rem; }
        .card { background: #141414; border: 1px solid rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; }
        .card h2 { color: var(--color-2); margin-bottom: 1.5rem; }
        input, textarea { width: 100%; padding: 0.75rem; background: #1d1b20; border: 1px solid #333; border-radius: 6px; color: white; margin-bottom: 1rem; }
        .roadmap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .roadmap-card { background: #1d1b20; border: 1px solid #333; padding: 1.5rem; border-radius: 8px; border-top: 3px solid var(--color-2); }
        .roadmap-card h3 { color: var(--color-2); margin-bottom: 0.5rem; }
        .step-list { list-style: none; padding: 0; margin: 1rem 0; font-size: 0.9rem; color: #ccc; }
        .step-list li { margin-bottom: 0.5rem; display: flex; gap: 0.5rem; }
    </style>
</head>
<body>
    <nav class="navigation">
        <a href="../index.html" class="logo">CYVE</a>
        <ul class="nav-links">
            <li><a href="dashboard.php">Dashboard</a></li>
            <li><a href="roadmaps.php">Roadmap</a></li>
            <li><a href="calendar.php">Calendar</a></li>
        </ul>
        <a href="dashboard.php?logout" class="btn-login" style="font-size: 1rem; padding: 0.5rem 1rem;">Logout</a>
    </nav>

    <div class="dashboard-container">
        <h1 style="font-size: 3rem; margin-bottom: 2rem;">Strategic Roadmaps</h1>

        <div class="card">
            <h2><?php echo $edit_roadmap ? 'Modify Strategy' : 'New Roadmap'; ?></h2>
            <form method="POST">
                <?php if ($edit_roadmap): ?>
                    <input type="hidden" name="id" value="<?php echo $edit_roadmap['id']; ?>">
                <?php
endif; ?>
                <input type="text" name="title" placeholder="Roadmap Title" value="<?php echo $edit_roadmap ? htmlspecialchars($edit_roadmap['title']) : ''; ?>" required>
                <textarea name="description" placeholder="Strategic Objective" rows="2"><?php echo $edit_roadmap ? htmlspecialchars($edit_roadmap['description']) : ''; ?></textarea>
                <textarea name="steps" placeholder="Operational Phases (One per line)" rows="5"><?php echo $edit_roadmap ? htmlspecialchars(implode("\n", json_decode($edit_roadmap['steps'], true))) : ''; ?></textarea>
                <button type="submit" name="<?php echo $edit_roadmap ? 'update_roadmap' : 'create_roadmap'; ?>" class="btn-login" style="border: none; cursor: pointer;"><?php echo $edit_roadmap ? 'Update Strategy' : 'Deploy Roadmap'; ?></button>
                <?php if ($edit_roadmap): ?>
                    <a href="roadmaps.php" style="color: #888; margin-left: 1rem;">Cancel</a>
                <?php
endif; ?>
            </form>
        </div>

        <div class="roadmap-grid">
            <?php foreach ($roadmaps as $roadmap): ?>
                <div class="roadmap-card">
                    <h3><?php echo htmlspecialchars($roadmap['title']); ?></h3>
                    <p style="font-size: 0.9rem; color: #888;"><?php echo htmlspecialchars($roadmap['description']); ?></p>
                    <ul class="step-list">
                        <?php
    $steps = json_decode($roadmap['steps'], true);
    if ($steps):
        foreach (array_slice($steps, 0, 3) as $step): ?>
                                <li><span>→</span> <?php echo htmlspecialchars($step); ?></li>
                            <?php
        endforeach;
        if (count($steps) > 3)
            echo "<li><small>+ " . (count($steps) - 3) . " more modules</small></li>";
    endif; ?>
                    </ul>
                    <div style="margin-top: 1rem; display: flex; gap: 1rem; font-size: 0.8rem;">
                        <?php if ($roadmap['created_by'] == $user_id || $role == 'admin'): ?>
                            <a href="?edit=<?php echo $roadmap['id']; ?>" style="color: var(--color-2);">Modify</a>
                            <a href="?delete=<?php echo $roadmap['id']; ?>" style="color: #ff4d4d;" onclick="return confirm('Archive?')">Archive</a>
                        <?php
    endif; ?>
                    </div>
                </div>
            <?php
endforeach; ?>
        </div>
    </div>
</body>
</html>
