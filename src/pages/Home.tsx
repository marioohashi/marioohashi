import { Link } from 'react-router'

export function Home() {
  const techStack = [
    { name: 'React 19', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { name: 'TypeScript', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'Tailwind CSS', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
    { name: 'Vite', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'React Router', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    { name: 'Node.js', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  ]

  const projects = [
    {
      title: 'Guess Word Game',
      description: 'Interactive word-guessing game featuring real-time state management, dynamic hints, and attempt tracking.',
      tags: ['React', 'TypeScript', 'Tailwind'],
      path: '/guessword',
      status: 'Ready to Play',
      icon: '🎮',
      active: true,
    },
    {
      title: 'GitHub Profile Finder',
      description: 'GitHub profile finder consuming REST API data to display bios, popular repositories, and stats.',
      tags: ['REST API', 'Async/Await', 'React'],
      path: '/github-finder',
      status: 'Coming Soon',
      icon: '🔍',
      active: false,
    },
    {
      title: 'Dev Utilities',
      description: 'Collection of handy developer tools, including a JSON formatter and CSS gradient generator.',
      tags: ['Clipboard API', 'Utilities'],
      path: '/tools',
      status: 'Planned',
      icon: '🛠️',
      active: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 sm:p-12">
      <main className="max-w-4xl w-full space-y-12 my-auto">
        {/* Hero Section / Intro */}
        <section className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new opportunities
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">Mario Ohashi</span> 👋
          </h1>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Full Stack Developer focused on building modern, fast, and highly interactive web applications using the React, TypeScript, and Node.js ecosystems.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
            <a
              href="https://github.com/marioohashi"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 font-medium text-sm transition-all shadow-md"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/marioohashi/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 font-medium text-sm transition-all shadow-md"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>

        {/* Tech Stack / Badges */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Tech Stack & Tools
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-transform hover:scale-105 select-none ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* Project Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Projects & Applications
            </h2>
            <span className="text-xs text-slate-500">{projects.length} applications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{project.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        project.active
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.active ? (
                    <Link
                      to={project.path}
                      className="inline-flex items-center justify-center w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-md"
                    >
                      Try Application &rarr;
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 px-4 rounded-xl bg-slate-800/50 text-slate-500 font-semibold text-xs cursor-not-allowed border border-slate-800"
                    >
                      Under Development
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl pt-8 border-t border-slate-900 text-center sm:text-left text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} Mario Ohashi. Built with React & Tailwind CSS.</p>
        <p>Curitiba, PR - Brazil</p>
      </footer>
    </div>
  )
}