import { Link } from 'react-router'
import { Navbar } from '../components/Navbar';

export function About() {
  const techStack = {
    frontend: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS', 'Figma / UI/UX'],
    backend: ['Node.js', 'C# (.NET)', 'RESTful APIs', 'PHP', 'SQL Databases'],
    tools: ['Git / GitHub', 'Azure DevOps', 'OutSystems', 'WordPress', 'Scrum / Agile']
  }

  const experiences = [
    {
      role: 'Full Stack Web Developer',
      company: 'ExxonMobil',
      type: 'Enterprise Applications',
      description: 'Developed and maintained enterprise web applications using React.js, TypeScript, Node.js, and .NET/C#. Built and consumed RESTful APIs, translated Figma designs into reusable components, and collaborated within global Agile/Scrum teams.',
      skills: ['React', 'TypeScript', 'Node.js', '.NET/C#']
    },
    {
      role: 'Front-End Developer',
      company: 'Inovatório Marketing Digital e Design',
      type: 'Agency',
      description: 'Built responsive interfaces using HTML5, CSS3, JavaScript, and WordPress, focusing on UI/UX improvements, performance, and cross-browser compatibility.',
      skills: ['JavaScript', 'HTML5/CSS3', 'WordPress', 'UI/UX']
    },
    {
      role: 'Freelance Front-End Developer',
      company: 'Stract.to',
      type: 'Contract',
      description: 'Delivered clean, maintainable front-end code and developed custom web components for a Google Sheets extension.',
      skills: ['React', 'Custom Components', 'JavaScript']
    }
  ]

  const focuses = [
    'Scalable Full Stack applications built with React, Node.js, and .NET/C#',
    'Clean, maintainable code and component-driven architectures',
    'Interfaces balancing performance, accessibility, and visual clarity',
    'Bridging design and engineering to ship polished end-to-end products'
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 sm:p-12">
      <main className="max-w-4xl w-full space-y-12 my-auto">
      <Navbar/>        
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open for Opportunities
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium">
              📍 Curitiba, PR - Brazil
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Mario Ohashi</span>
          </h1>

          <p className="text-lg text-blue-400 font-semibold">
            Full Stack Developer & UI/UX Designer
          </p>

          <blockquote className="p-4 rounded-2xl bg-slate-900/80 border-l-4 border-blue-500 text-slate-300 text-sm leading-relaxed italic">
            &ldquo;Full Stack Developer blending engineering and design to build scalable, user-friendly web applications. Backed by over a decade of experience in creative leadership and digital media production.&rdquo;
          </blockquote>
        </section>

        {/* Tech Stack */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            🔧 Tech Stack & Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Front-end & Design</h3>
              <div className="flex flex-wrap gap-1.5">
                {techStack.frontend.map(item => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Back-end & APIs</h3>
              <div className="flex flex-wrap gap-1.5">
                {techStack.backend.map(item => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-1.5">
                {techStack.tools.map(item => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Snapshot */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            💼 Experience Snapshot
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.company} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                    <span className="text-xs font-semibold text-blue-400">@ {exp.company}</span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-medium self-start sm:self-center border border-slate-700/50">
                    {exp.type}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map(skill => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What I'm Focusing On */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            🌐 Current Focus
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focuses.map((focus, index) => (
              <li key={index} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
                <span className="text-blue-400 font-bold text-sm leading-none">•</span>
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Want to see my code in action?</h3>
            <p className="text-xs text-slate-400">Try out the Word Guess game built with React & Tailwind.</p>
          </div>
          <Link
            to="/guessword"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shrink-0 shadow-lg shadow-blue-600/20"
          >
            Play Guess Word &rarr;
          </Link>
        </section>

      </main>
    </div>
  )
}