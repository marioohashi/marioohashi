import type { LocationData } from '../types/game';

export const GAME_LOCATIONS: LocationData[] = [
    {
        id: 'plaza',
        name: 'Praça Central (Início)',
        description: 'Olá! Sou Mario Ohashi. Desenvolvedor Full-Stack e entusiasta de mobile, unindo design, UX e código limpo.',
        x: 50,
        y: 80,
        icon: '🏰',
        category: 'start',
    },
    {
        id: 'exxon',
        name: 'Mercado de Trabalho',
        description: 'Experiência corporativa global (2023–2025): desenvolvimento de aplicações complexas e escaláveis, automação e arquitetura web.',
        x: 25,
        y: 50,
        icon: '⚡',
        category: 'experience',
    },
    {
        id: 'projects',
        name: 'Vila dos Projetos',
        description: 'Vitrine técnica: aplicações web modernas em React, Node.js, TypeScript e integrações de alto desempenho.',
        x: 75,
        y: 50,
        icon: '🏡',
        category: 'projects',
    },
    {
        id: 'skills',
        name: 'Guilda de Habilidades',
        description: 'Inventário de perícias equipadas: React, TypeScript, Node.js, Tailwind CSS, OutSystems e fundamentos em Swift/iOS.',
        x: 35,
        y: 20,
        icon: '📜',
        category: 'skills',
    },
    {
        id: 'tavern',
        name: 'Taverna (Contato)',
        description: 'Ponto de encontro para conexões profissionais, mensagens diretas, GitHub e LinkedIn.',
        x: 65,
        y: 20,
        icon: '🍻',
        category: 'tavern',
    },
];