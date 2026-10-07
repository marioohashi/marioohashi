import { Link } from 'react-router';
import { Drop } from './Drop';
import { projects } from './data';

function Mock({ kind }: { kind: string }) {
  if (kind === 'words') {
    return (
      <div className="mock-words" aria-hidden="true">
        {['R', 'E', 'A', 'C', 'T', 'H', 'O', 'O', 'K', 'S'].map((letter, i) => (
          <span key={i} className={i < 2 ? 'ok' : i === 4 ? 'near' : ''}>{letter}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="mock-pets" aria-hidden="true">
      <span className="paw">🐾</span>
      <span className="bar" /><span className="bar short" />
      <span className="pill">Adopt me</span>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="sb-section" id="projects">
      <header className="sb-section-head">
        <span className="sb-index sb-mono">03</span>
        <div>
          <p className="sb-mono sb-kicker">PERSONAL PROJECTS</p>
          <h2 className="sb-h2">Built in the wild</h2>
        </div>
        <p className="sb-hand sb-head-note">side quests that taught me the most</p>
      </header>

      <div className="sb-proj-grid">
        {projects.map((project, index) => (
          <Drop key={project.title} inView rotate={0} delay={index * 0.12}>
            <article className="sb-proj">
              <figure className="sb-polaroid sb-proj-shot">
                <span className="sb-tape sb-tape-top" />
                <div className="sb-photo sb-photo-mock"><Mock kind={project.mock} /></div>
                <figcaption className="sb-hand">fig. {project.number} — {project.type}</figcaption>
              </figure>
              <div className="sb-proj-body">
                <p className="sb-mono sb-eyebrow">PROJECT {project.number}</p>
                <h3 className="sb-h3">{project.title}</h3>
                <p className="sb-summary">{project.description}</p>
                <ul className="sb-tags">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="sb-links">
                  {project.path ? (
                    <Link className="sb-btn sb-btn-ink" to={project.path}>{project.action} <span aria-hidden="true">→</span></Link>
                  ) : null}

                  {project.repo && (
                    <a className="sb-btn" href={project.repo} target="_blank" rel="noreferrer">
                      {project.path ? 'GitHub' : project.action} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Drop>
        ))}
        <div className="sb-sticky sb-sticky-wide sb-hand">
          <span className="sb-tape sb-tape-top" />
          more experiments loading… ✎
        </div>
      </div>
    </section>
  );
}
