export const SOCIALS = [
  { name: 'GitHub',   href: 'https://github.com/schultzh06',      icon: 'simple-icons:github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/schultzh06',          icon: 'simple-icons:linkedin' },
  { name: 'Contact',    href: '/contact',                           icon: 'lucide:mail' },
] as const;

export interface StackItem {
  name: string;
  icon: string;
}

export const STACKROWS: StackItem[][] = [
  [
    { name: 'TypeScript',  icon: 'simple-icons:typescript' },
    { name: 'Python',      icon: 'simple-icons:python' },
    { name: 'C++',         icon: 'simple-icons:cplusplus' },
    { name: 'C',           icon: 'simple-icons:c' },
    { name: 'Java',        icon: 'simple-icons:openjdk' },
    { name: 'SQL',         icon: 'mdi:database' },
    { name: 'Bash',        icon: 'simple-icons:gnubash' },
    { name: 'React',       icon: 'simple-icons:react' },
    { name: 'Astro',       icon: 'simple-icons:astro' },
    { name: 'Vite',        icon: 'simple-icons:vite' },
    { name: 'Tailwind',    icon: 'simple-icons:tailwindcss' },
    { name: 'Three.js',    icon: 'simple-icons:threedotjs' },
    { name: 'Node.js',     icon: 'simple-icons:nodedotjs' },
    { name: 'Express',     icon: 'simple-icons:express' },
    { name: 'Prisma',      icon: 'simple-icons:prisma' },
    { name: 'PostgreSQL',  icon: 'simple-icons:postgresql' },
    { name: 'Auth0',       icon: 'simple-icons:auth0' },
    { name: 'OpenAI API',  icon: 'simple-icons:openai' },
  ],
  [
    { name: 'Linux',            icon: 'simple-icons:linux' },
    { name: 'Docker',           icon: 'simple-icons:docker' },
    { name: 'Proxmox',          icon: 'simple-icons:proxmox' },
    { name: 'Git',              icon: 'simple-icons:git' },
    { name: 'pnpm',             icon: 'simple-icons:pnpm' },
    { name: 'Vitest',           icon: 'simple-icons:vitest' },
    { name: 'pytest',           icon: 'simple-icons:pytest' },
    { name: 'Ollama',           icon: 'simple-icons:ollama' },
    { name: 'Kali Linux',       icon: 'simple-icons:kalilinux' },
    { name: 'Wazuh',            icon: 'mdi:shield-check' },
    { name: 'MITRE ATT&CK',     icon: 'mdi:sitemap' },
    { name: 'Atomic Red Team',  icon: 'mdi:target' },
    { name: 'Nmap',             icon: 'mdi:radar' },
    { name: 'CrowdStrike',      icon: 'mdi:shield-lock' },
    { name: 'Threat Modeling',  icon: 'mdi:shield-search' },
    { name: 'Restic',           icon: 'mdi:backup-restore' },
    { name: 'Jira',             icon: 'simple-icons:jira' },
    { name: 'Agile/Scrum',      icon: 'mdi:sync' },
  ],
];