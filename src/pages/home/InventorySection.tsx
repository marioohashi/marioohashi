import { Drop } from './Drop';
import { inventory } from './data';

export function InventorySection() {
  return (
    <section className="sb-section" id="inventory">
      <header className="sb-section-head">
        <span className="sb-index sb-mono">04</span>
        <div>
          <p className="sb-mono sb-kicker">TOOLKIT</p>
          <h2 className="sb-h2">What&apos;s in my pack?</h2>
        </div>
        <p className="sb-hand sb-head-note">tools for the build, instincts for the details</p>
      </header>

      <div className="sb-inv-grid">
        {inventory.map((group, index) => (
          <Drop key={group.title} inView rotate={0} delay={index * 0.1}>
            <article className="sb-paper sb-index-card">
              <span className="sb-tape sb-tape-top" />
              <p className="sb-mono sb-eyebrow">0{index + 1} / {group.subtitle}</p>
              <h3 className="sb-h3">{group.title}</h3>
              <ul className="sb-skill-list">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    {'logo' in skill && skill.logo ? (
                      <img src={skill.logo} alt="" width={22} height={22} />
                    ) : (
                      <span className="sb-logo-fallback" aria-hidden="true">✦</span>
                    )}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          </Drop>
        ))}
      </div>
    </section>
  );
}
