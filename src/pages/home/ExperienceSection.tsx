import { Drop } from './Drop';
import { CV_URL, works } from './data';

export function ExperienceSection() {
  return (
    <section className="sb-section" id="experience">
      <header className="sb-section-head">
        <span className="sb-index sb-mono">02</span>
        <div>
          <p className="sb-mono sb-kicker">EXPERIENCES / WORKS</p>
          <h2 className="sb-h2">Professional journey</h2>
        </div>
        <p className="sb-hand sb-head-note">two worlds, one thread: making ideas real</p>
      </header>

      <div className="sb-exp-grid">
        {works.map((mission, index) => (
          <Drop key={mission.id} inView rotate={0} delay={index * 0.1}>
            <article className="sb-paper sb-exp">
              <span className="sb-tape sb-tape-top" />
              <div className="sb-exp-meta sb-mono">
                <span>{mission.marker}</span>
                <span>{mission.period}</span>
              </div>
              <p className="sb-mono sb-eyebrow">{mission.eyebrow}</p>
              <h3 className="sb-h3">{mission.title}</h3>
              <p className="sb-place">{mission.place}</p>
              <p className="sb-summary">{mission.summary}</p>
              <p className="sb-details">{mission.details}</p>
              <ul className="sb-tags">
                {mission.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
              <p className="sb-hand sb-margin-note">{mission.note}</p>
            </article>
          </Drop>
        ))}

        <Drop inView rotate={0} delay={0.2}>
          <aside className="sb-paper sb-cv-card">
            <span className="sb-tape sb-tape-left" />
            <p className="sb-mono sb-kicker">THE FULL STORY</p>
            <p className="sb-cv-title">Want the details on paper?</p>
            <a className="sb-btn sb-btn-ink" href={CV_URL} download>
              Download CV (PDF) <span aria-hidden="true">↓</span>
            </a>
            <p className="sb-hand">also: Inovatório, Stract.to &amp; more →</p>
          </aside>
        </Drop>
      </div>
    </section>
  );
}
