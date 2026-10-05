export interface SkillCategory {
    category: string;
    description: string;
    items: {
        name: string;
        level: 'Expert' | 'Advanced' | 'Learning' | 'Core';
        icon: string;
        stats: string;
    }[];
}

export const RPG_SKILLS: SkillCategory[] = [
    {
        category: 'Front-End Gear',
        description: 'High-code interfaces & user-centric design systems.',
        items: [
            { name: 'React.js', level: 'Advanced', icon: '⚛️', stats: 'UI Architecture & Hooks' },
            { name: 'TypeScript', level: 'Advanced', icon: '🛡️', stats: 'Static Typing & Safety' },
            { name: 'Tailwind CSS', level: 'Expert', icon: '🎨', stats: 'Design Systems & UI' },
        ],
    },
    {
        category: 'Back-End & Database',
        description: 'Server-side logic, RESTful APIs, and data persistence.',
        items: [
            { name: 'Node.js & Express', level: 'Learning', icon: '🟢', stats: 'REST APIs & Backend' },
            { name: 'PostgreSQL & Prisma', level: 'Learning', icon: '🐘', stats: 'Relational DB & ORM' },
            { name: '.NET / C#', level: 'Core', icon: '⚙️', stats: 'Enterprise Logic' },
        ],
    },
    {
        category: 'Mobile & Future Quests',
        description: 'Expanding horizons into native mobile applications.',
        items: [
            { name: 'Swift & SwiftUI', level: 'Learning', icon: '📱', stats: 'iOS Native Development' },
        ],
    },
];