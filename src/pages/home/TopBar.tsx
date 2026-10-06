import { sections } from './data';

export function TopBar() {
  return (
    <header className="sb-topbar">
      <a className="sb-brand" href="#start" aria-label="Mario Ohashi, back to the top">
        <span className="sb-brand-mark">M</span>
        <span>OHASHI</span>
      </a>
      <nav className="sb-nav" aria-label="Sections">
        {sections.map(({ id, label, key }) => (
          <a key={id} href={`#${id}`}>{key}.{label}</a>
        ))}
      </nav>
      {/* <nav className="sb-social" aria-label="Social links">
        <a href="https://github.com/marioohashi" target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href="https://www.linkedin.com/in/marioohashi/" target="_blank" rel="noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </nav> */}
    </header>
  );
}
