import { Link, Outlet } from 'react-router'

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar Superior */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg text-blue-400 hover:text-blue-300">
            &lt;DevPortfolio /&gt;
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link to="/" className="hover:text-slate-100 transition-colors">Home</Link>
            <Link to="/guessword" className="hover:text-slate-100 transition-colors">Guess Word</Link>
            <Link to="/github-finder" className="hover:text-slate-100 transition-colors">GitHub Finder</Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo das Páginas */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}