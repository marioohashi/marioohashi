# 🗺️ Ohashi's Journey

## Documento de Arquitetura e Conceito do Portfólio

## 1. Conceito, experiência do usuário (UX) e direção visual

### 1.1 Conceito e proposta de valor

**Ideia central:** Transformar o portfólio profissional ([marioohashi.com.br](https://marioohashi.com.br)) em um mundo aberto (_overworld_) inspirado nos RPGs clássicos de 16 bits dos anos 90, como _Chrono Trigger_ e _Final Fantasy_. O visitante assume o papel de explorador e navega pelo mapa da trajetória profissional, em que cada marco importante se conecta a uma fase da carreira e do portfólio de engenharia.

**Proposta única (USP):** Unir uma década de experiência em liderança criativa e design (Ohashi Creative Studio) à maturidade técnica atual como desenvolvedor Full-Stack (React, TypeScript e Node.js), em um produto digital memorável, imersivo e de alto nível estético.

### 1.2 Identidade visual e paleta de cores

Para equilibrar a nostalgia pixelada com a sofisticação esperada de um desenvolvedor pleno, a paleta evita uma estética rústica e adota um estilo _neon-retro_:

| Cores                                                  | Aplicação                                                                                          |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Verde grama / natureza (`#78C850` / `#4A5D23`)         | Referência sutil às expedições de _backpacking_ e trilhas pelo Brasil; cria um ambiente acolhedor. |
| Azul noturno / espaço profundo (`#0F172A` / `#003366`) | Cor de fundo, com conforto visual de modo escuro nativo e aparência moderna.                       |
| Ciano e dourado neon (`#38BDF8` / `#FFD700`)           | Destaques para botões interativos, itens colecionáveis (habilidades) e caixas de diálogo ativas.   |
| Cinza-chumbo e _off-white_ (`#1E293B` / `#F8FAFC`)     | Estrutura de painéis e textos com boa legibilidade.                                                |

### 1.3 Tipografia

- **Títulos e elementos de jogo:** `Press Start 2P` (Google Fonts), para dar um toque autêntico de 8/16 bits a cabeçalhos selecionados e títulos de seções.
- **Textos, diálogos e código:** `JetBrains Mono` ou `Fira Code`, para garantir clareza técnica nas caixas de diálogo dos NPCs e nas descrições dos projetos.

### 1.4 Arquitetura de informação e jornada do usuário

Os principais locais do mapa representam as seções do portfólio:

- **Hero / Início — Praça Central:** Saudação clássica ("Hello there, I'm Mario 👋"), avatar em pixel art e convite interativo para iniciar a jornada.
- **Fortaleza ExxonMobil — Experiência Corporativa:** Construção imponente que apresenta a experiência em equipes globais ágeis (Scrum), desenvolvimento web e entrega de sistemas corporativos.
- **Vila dos Projetos — Vitrine Técnica:** Casas e baús que abrem cases reais, como o aplicativo full-stack de adoção de pets e ferramentas em Node/React.
- **Guilda de Habilidades — Inventário de tecnologias:** Painel interativo no estilo de inventário de RPG, com React, TypeScript, Node.js, PostgreSQL e Tailwind CSS como perícias equipadas.
- **Taverna — Contato e redes sociais:** Ponto de encontro para conexões profissionais, envio de mensagens diretas e acesso ao LinkedIn e GitHub.

## 2. Arquitetura técnica, stack e componentes

### 2.1 Stack tecnológica

- **Front-end:** React.js com TypeScript, para garantir tipagem estática rigorosa e escalabilidade na lógica de estado do jogo.
- **Estilização:** Tailwind CSS, combinado com utilitários CSS customizados para grids de tiles, animações de sprites e transições de tela.
- **Gerenciamento de estado:** React `useState` / `useReducer` ou uma máquina de estados leve, para controlar o local atual do mapa, os modais abertos e a posição do avatar.
- **Hospedagem e deploy:** Vercel, com domínio customizado e otimização para dispositivos móveis e desktop.

### 2.2 Estrutura de componentes sugerida

```text
src/
├── components/
│   ├── ui/          # Botões estilo retro, caixas de diálogo e modais
│   ├── map/         # Overworld, grades de tiles e camadas
│   ├── character/   # Avatar e animações de movimento (sprites)
│   ├── dialogue/    # Janelas de texto estilo RPG (efeito typewriter)
│   └── inventory/   # Painel flutuante de habilidades técnicas
├── data/
│   ├── projects.ts  # Dados dos cases (título, stack, descrição e links)
│   └── experience.ts # Histórico profissional (ExxonMobil etc.)
├── hooks/
│   └── useKeyboardNav.ts # Hook para capturar setas do teclado / WASD
├── App.tsx
└── main.tsx
```

### 2.3 Especificações técnicas de destaque

- **Movimentação e interação:** O usuário poderá navegar por cliques no mapa — selecionando uma construção para caminhar até ela — ou pelas setas do teclado e teclas WASD. Ao colidir com um local ou selecioná-lo, o evento abre o modal de diálogo.
- **Efeito de digitação (_typewriter effect_):** As caixas de texto com descrições de projetos e experiências exibirão o conteúdo letra por letra, simulando os diálogos clássicos dos jogos de SNES.
- **Responsividade adaptativa:** Em telas grandes (desktop), a experiência imersiva do mapa será o destaque. Em telas menores (smartphones), o mapa se adaptará a uma interface de toque fluida, organizada em blocos verticais interativos.
