export const CV_URL = '/Mario-Ohashi-CV.pdf';

export const works = [
  {
    id: 'exxon',
    marker: '01',
    eyebrow: 'Enterprise experience',
    title: 'Full-Stack Web Developer',
    place: 'ExxonMobil',
    period: '2023 — 2025',
    note: '3 yrs of enterprise impact',
    summary:
      'Intern turned Full Stack Developer, building web applications for global operations.',
    details:
      'Built responsive, accessible, and reusable interfaces with React and TypeScript, developed Node.js and .NET services, and designed and consumed REST APIs in global Agile (Scrum) teams.',
    skills: ['React', 'TypeScript', 'Node.js', '.NET', 'REST APIs', 'Azure DevOps'],
  },
  {
    id: 'ohashi-studio',
    marker: '02',
    eyebrow: 'Creative leadership',
    title: 'Founder & Creative Director',
    place: 'Ohashi Creative Studio',
    period: '2012 — 2022',
    note: '10 yrs of client work',
    summary:
      'A decade leading a creative studio, bridging design, branding, and the web.',
    details:
      'Led projects from concept to delivery, designing brand identities and websites with HTML, CSS, JavaScript, WordPress, and PHP while managing clients end to end.',
    skills: ['UI/UX', 'Creative direction', 'JavaScript', 'WordPress', 'Figma'],
  },
];

export const projects = [
  {
    title: 'Guess Word Game',
    type: 'Playable',
    description:
      'A lively word-guessing game with real-time state, dynamic hints, and attempt tracking.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    path: '/portfolio/guessword',
    action: 'Play the game',
    repo: '',
    mock: 'words',
    number: '01',
  },
  {
    title: 'Pet Adoption Platform',
    type: 'In development',
    description:
      'A full-stack platform that connects adopters with pets through thoughtful profiles and adoption journeys.',
    tags: ['React', 'Node.js', 'TypeScript'],
    path: 'https://pet-adoption-platform-web.vercel.app/',
    action: 'Mockup',
    repo: 'https://github.com/marioohashi/pet-adoption-platform-web',
    mock: 'pets',
    number: '02',
  },
];

const icon = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export const inventory = [
  {
    title: 'Frontend',
    subtitle: 'Interfaces',
    accent: 'cyan',
    skills: [
      { name: 'React', logo: icon('react', '61DAFB') },
      { name: 'TypeScript', logo: icon('typescript', '3178C6') },
      { name: 'Tailwind CSS', logo: icon('tailwindcss', '06B6D4') },
    ],
  },
  {
    title: 'Backend',
    subtitle: 'Services & data',
    accent: 'violet',
    skills: [
      { name: 'Node.js', logo: icon('nodedotjs', '5FA04E') },
      { name: 'Express', logo: icon('express', '2B2B2B') },
      { name: 'PostgreSQL', logo: icon('postgresql', '4169E1') },
      { name: 'Prisma', logo: icon('prisma', '2D3748') },
    ],
  },
  {
    title: 'Tools',
    subtitle: 'Craft & workflow',
    accent: 'gold',
    skills: [
      { name: 'Git', logo: icon('git', 'F05032') },
      { name: 'Figma', logo: icon('figma', 'F24E1E') },
      { name: 'Azure DevOps' },
      { name: 'Software architecture' },
      { name: 'Creative direction' },
    ],
  },
];

export const sections = [
  { id: 'start', label: 'Start', key: '01' },
  { id: 'experience', label: 'Experiences', key: '02' },
  { id: 'projects', label: 'Projects', key: '03' },
  { id: 'inventory', label: 'My pack', key: '04' },
  { id: 'tavern', label: 'Contact', key: '05' },
];


export const RANDOM_NOTES = [
  "idea: design systems that don't feel like design systems ✎",
  "☕ french press tip: water at 92°C, 4 min steep time.",
  "code rule: make it work, make it right, make it fast.",
  "focus: simplicity is the ultimate sophistication ✦",
  "lens choice matters, but the angle and the intention tell the real story 📷",
  "revisiting legacy code is like deciphering an ancient archaeological map 🗺️",
  "debugging at 2am: when you become both the detective and the suspect 🔍",
  "design is not just what it looks like, it's how it orchestrates the experience ✨",
  "curitiba weather: four seasons in a single afternoon 🌦️",
  "git commit -m 'fixed that one weird bug nobody understands' 🚀",
  "tribute to details: every pixel has a purpose, every function has a reason 🎯"
];