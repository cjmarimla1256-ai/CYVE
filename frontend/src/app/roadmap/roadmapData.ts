/**
 * Role-specific roadmap content: timeline step labels and recommended companies.
 * Step order matches RoadmapContext steps per field (red: 1-4, blue: 5-8, purple: 9-12).
 */

export type RoleKey = 'red' | 'blue' | 'purple';

export interface TimelineStepConfig {
  stepLabel: string;
  subtitle: string;
  icon: 'game' | 'foundations' | 'defensive' | 'offensive';
  /** RoadmapContext step ids for this visual step (max 3 for content blocks) */
  stepIds: string[];
}

export interface CompanyInfo {
  name: string;
  address: string;
  description: string;
  /** Example job titles / roles at this company */
  roles?: string[];
  /** Company or careers URL */
  website?: string;
  latLng?: [number, number];
}

/** Extra info for a roadmap step (duration, skills, resources) keyed by step id */
export interface StepExtraInfo {
  duration: string;
  skills: string[];
  resources: { label: string; url: string }[];
}

const RED_TIMELINE: TimelineStepConfig[] = [
  { stepLabel: 'Step 1', subtitle: 'Beginner', icon: 'game', stepIds: ['1'] },
  { stepLabel: 'Step 2', subtitle: 'Foundations of Security', icon: 'foundations', stepIds: ['2'] },
  { stepLabel: 'Step 3', subtitle: 'Defensive Security', icon: 'defensive', stepIds: ['3'] },
  { stepLabel: 'Step 4', subtitle: 'Offensive Security', icon: 'offensive', stepIds: ['4'] },
];

const BLUE_TIMELINE: TimelineStepConfig[] = [
  { stepLabel: 'Step 1', subtitle: 'Beginner', icon: 'game', stepIds: ['5'] },
  { stepLabel: 'Step 2', subtitle: 'Foundations of Security', icon: 'foundations', stepIds: ['6'] },
  { stepLabel: 'Step 3', subtitle: 'Defensive Security', icon: 'defensive', stepIds: ['7'] },
  { stepLabel: 'Step 4', subtitle: 'Incident Response & Threat Intel', icon: 'offensive', stepIds: ['8'] },
];

const PURPLE_TIMELINE: TimelineStepConfig[] = [
  { stepLabel: 'Step 1', subtitle: 'Beginner', icon: 'game', stepIds: ['9'] },
  { stepLabel: 'Step 2', subtitle: 'Foundations of Security', icon: 'foundations', stepIds: ['10'] },
  { stepLabel: 'Step 3', subtitle: 'Defensive Security', icon: 'defensive', stepIds: ['11'] },
  { stepLabel: 'Step 4', subtitle: 'Collaboration & Optimization', icon: 'offensive', stepIds: ['12'] },
];

export const ROLE_TIMELINES: Record<RoleKey, TimelineStepConfig[]> = {
  red: RED_TIMELINE,
  blue: BLUE_TIMELINE,
  purple: PURPLE_TIMELINE,
};



export const ROLE_TITLES: Record<RoleKey, string> = {
  red: 'Red Team — Offensive Security',
  blue: 'Blue Team — Defensive Security',
  purple: 'Purple Team — Collaboration & Optimization',
};

export const ROLE_OVERVIEW: Record<RoleKey, string> = {
  red: 'Offensive security focuses on finding vulnerabilities before attackers do. You’ll learn ethical hacking, penetration testing, and secure coding so you can think like an attacker and help organizations harden their defenses. This path leads to roles such as Penetration Tester, Red Team Operator, and Security Researcher.',
  blue: 'Defensive security is about protecting systems, detecting threats, and responding to incidents. You’ll build skills in SOC operations, SIEM, incident response, and threat hunting. This path leads to roles such as SOC Analyst, Incident Responder, and Security Engineer.',
  purple: 'Purple team combines offensive and defensive practices to improve security through collaboration. You’ll learn both red and blue skills and how to run exercises that make defenses stronger. This path leads to roles such as Security Consultant, Purple Team Lead, and Cyber Strategy roles.',
};

export const ROLE_SKILLS: Record<RoleKey, string[]> = {
  red: ['Network & web penetration testing', 'Vulnerability assessment', 'OWASP Top 10', 'Kali Linux & tooling', 'Scripting (Python/Bash)', 'Report writing'],
  blue: ['SIEM & log analysis', 'Incident response', 'Threat detection rules', 'Network security monitoring', 'Malware analysis basics', 'Security tooling (EDR, firewalls)'],
  purple: ['Red + Blue techniques', 'Purple team exercises', 'Risk assessment', 'Security strategy', 'Communication & collaboration', 'Advisory and consulting'],
};

export const ROLE_CERTIFICATIONS: Record<RoleKey, string[]> = {
  red: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'OSCP (Offensive Security)', 'eJPT', 'PNPT'],
  blue: ['CompTIA Security+', 'CySA+', 'GCIH', 'SANS GIAC', 'BTL1 / BTL2'],
  purple: ['CompTIA Security+', 'CISSP', 'OSCP or GCIH', 'CRISC', 'CISM'],
};

/** Step id -> extra info (duration, skills, resources). Used for display only. */
export const STEP_EXTRA: Record<string, StepExtraInfo> = {
  '1': { duration: '2–4 weeks', skills: ['CIA triad', 'Threat models', 'Security basics'], resources: [{ label: 'TryHackMe – Intro to Cyber', url: 'https://tryhackme.com' }, { label: 'Cybrary – Cybersecurity fundamentals', url: 'https://www.cybrary.it' }] },
  '2': { duration: '3–6 weeks', skills: ['TCP/IP', 'DNS', 'HTTP', 'Network protocols'], resources: [{ label: 'Professor Messer – Network+', url: 'https://www.professormesser.com' }, { label: 'Practical Networking', url: 'https://www.practicalnetworking.net' }] },
  '3': { duration: '4–8 weeks', skills: ['Recon', 'Scanning', 'Exploitation basics'], resources: [{ label: 'TryHackMe – Pentesting path', url: 'https://tryhackme.com' }, { label: 'Hack The Box', url: 'https://www.hackthebox.com' }] },
  '4': { duration: '4–8 weeks', skills: ['OWASP Top 10', 'Web vulns', 'Burp Suite'], resources: [{ label: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' }, { label: 'OWASP', url: 'https://owasp.org' }] },
  '5': { duration: '3–6 weeks', skills: ['SOC workflows', 'Ticketing', 'Alert triage'], resources: [{ label: 'SANS SOC resources', url: 'https://www.sans.org' }, { label: 'Cybrary – SOC Level 1', url: 'https://www.cybrary.it' }] },
  '6': { duration: '4–6 weeks', skills: ['Incident lifecycle', 'Containment', 'Post-incident'], resources: [{ label: 'SANS IR', url: 'https://www.sans.org' }, { label: 'NIST IR Guide', url: 'https://www.nist.gov' }] },
  '7': { duration: '4–8 weeks', skills: ['SIEM', 'Detection rules', 'Log analysis'], resources: [{ label: 'Splunk fundamentals', url: 'https://www.splunk.com' }, { label: 'Elastic Security', url: 'https://www.elastic.co' }] },
  '8': { duration: '4–6 weeks', skills: ['Threat hunting', 'Hypothesis-driven search', 'IOCs'], resources: [{ label: 'MITRE ATT&CK', url: 'https://attack.mitre.org' }, { label: 'SANS Threat Hunting', url: 'https://www.sans.org' }] },
  '9': { duration: '2–4 weeks', skills: ['Security concepts', 'Risk', 'Governance'], resources: [{ label: 'CISSP domains overview', url: 'https://www.isc2.org' }, { label: 'NIST CSF', url: 'https://www.nist.gov/cyberframework' }] },
  '10': { duration: '3–6 weeks', skills: ['Monitoring', 'SOC basics', 'Defensive tools'], resources: [{ label: 'Blue Team Labs', url: 'https://www.blueteamlabs.com' }, { label: 'Detection engineering', url: 'https://detectionengineering.net' }] },
  '11': { duration: '4–6 weeks', skills: ['Vuln assessment', 'Pentest basics', 'Reporting'], resources: [{ label: 'TryHackMe', url: 'https://tryhackme.com' }, { label: 'PentesterLab', url: 'https://pentesterlab.com' }] },
  '12': { duration: '4–8 weeks', skills: ['Purple teaming', 'Threat intel', 'Collaboration'], resources: [{ label: 'Purple Team Guide', url: 'https://purpleteamdefense.com' }, { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org' }] },
};

const RED_COMPANIES_UPDATED: CompanyInfo[] = [
  { name: 'Offensive Security', address: 'Global (Remote)', description: 'Creators of Kali Linux & OSCP; penetration testing training and certifications.', roles: ['Penetration Tester', 'Security Researcher', 'Training'], website: 'https://www.offensive-security.com', latLng: [37.77, -122.42] },
  { name: 'Rapid7', address: 'Boston, MA, USA', description: 'Vulnerability management and penetration testing solutions.', roles: ['Penetration Tester', 'Vulnerability Researcher', 'Security Engineer'], website: 'https://www.rapid7.com/careers', latLng: [42.36, -71.06] },
  { name: 'Bugcrowd', address: 'San Francisco, CA, USA', description: 'Crowdsourced security and bug bounty platform.', roles: ['Security Researcher', 'Pentester', 'Program Manager'], website: 'https://www.bugcrowd.com/careers', latLng: [37.77, -122.42] },
  { name: 'HackerOne', address: 'San Francisco, CA, USA', description: 'Security platform connecting organizations with ethical hackers.', roles: ['Security Engineer', 'Pentester', 'Trust & Safety'], website: 'https://www.hackerone.com/careers', latLng: [37.77, -122.42] },
];

const BLUE_COMPANIES_UPDATED: CompanyInfo[] = [
  { name: 'Palo Alto Networks', address: 'Santa Clara, CA, USA', description: 'Cybersecurity and SOC solutions; next-gen firewalls and threat detection.', roles: ['SOC Analyst', 'Security Engineer', 'Threat Researcher'], website: 'https://jobs.paloaltonetworks.com', latLng: [37.35, -121.95] },
  { name: 'CrowdStrike', address: 'Austin, TX, USA', description: 'Endpoint protection and incident response; Falcon platform.', roles: ['Incident Response', 'Threat Hunter', 'Security Analyst'], website: 'https://www.crowdstrike.com/careers', latLng: [30.27, -97.74] },
  { name: 'Mandiant (Google Cloud)', address: 'Reston, VA, USA', description: 'Incident response, threat intelligence, and managed detection.', roles: ['Incident Responder', 'Consultant', 'Threat Intel'], website: 'https://www.mandiant.com/careers', latLng: [38.96, -77.36] },
  { name: 'Splunk', address: 'San Francisco, CA, USA', description: 'SIEM and security analytics; SOC and observability platforms.', roles: ['Security Analyst', 'SIEM Engineer', 'Detection Engineer'], website: 'https://www.splunk.com/en_us/careers.html', latLng: [37.77, -122.42] },
];

const PURPLE_COMPANIES_UPDATED: CompanyInfo[] = [
  { name: 'IBM Security', address: 'Armonk, NY, USA', description: 'Hybrid security services; X-Force and consulting.', roles: ['Security Consultant', 'Red Team', 'Advisory'], website: 'https://www.ibm.com/careers', latLng: [41.13, -73.71] },
  { name: 'Accenture Security', address: 'Dublin, Ireland', description: 'Security consulting; red + blue team and strategy.', roles: ['Cybersecurity Consultant', 'Penetration Tester', 'SOC'], website: 'https://www.accenture.com/careers', latLng: [53.35, -6.26] },
  { name: 'Deloitte Cyber', address: 'Global', description: 'Risk and cyber strategy; offensive and defensive services.', roles: ['Cyber Consultant', 'Penetration Tester', 'IR'], website: 'https://www2.deloitte.com/careers', latLng: [40.71, -74.01] },
  { name: 'KPMG Cyber Security', address: 'Amstelveen, Netherlands', description: 'Advisory and managed security; purple team engagements.', roles: ['Cyber Consultant', 'Penetration Tester', 'Advisory'], website: 'https://home.kpmg/careers', latLng: [52.3, 4.86] },
];

export const ROLE_COMPANIES: Record<RoleKey, CompanyInfo[]> = {
  red: RED_COMPANIES_UPDATED,
  blue: BLUE_COMPANIES_UPDATED,
  purple: PURPLE_COMPANIES_UPDATED,
};
