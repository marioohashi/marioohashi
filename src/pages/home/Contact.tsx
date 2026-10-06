// import type { FormEvent } from 'react';
import { Drop } from './Drop';
import { InteractiveTerminal } from './InteractiveTerminal';
// import { Arrow } from './Arrow';

export function Contact() {
  // const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const name = String(formData.get('name') ?? '').trim();
  //   const email = String(formData.get('email') ?? '').trim();
  //   const message = String(formData.get('message') ?? '').trim();
  //   const subject = `A note from ${name}`;
  //   const body = `${message}\n\n— ${name}\n${email}`;
  //
  //   window.location.href = `mailto:mario.ohashi@gmail.com?${new URLSearchParams({
  //     subject,
  //     body,
  //   })}`;
  // };

  return (
    <section className="sb-section" id="tavern">
      <header className="sb-section-head">
        <span className="sb-index sb-mono">05</span>
        <div>
          <p className="sb-mono sb-kicker">CONTACT &amp; TAVERN</p>
          <h2 className="sb-h2">Got a quest for me?</h2>
        </div>
        <p className="sb-hand sb-head-note">pull up a chair — the next story starts with a hello</p>
      </header>

      <div className="sb-contact-grid">
        <Drop inView rotate={0}>
          <div className="sb-paper sb-contact-card">
            <span className="sb-tape sb-tape-top" />
            <p className="sb-mono sb-kicker">FIND ME</p>
            <a href="https://www.linkedin.com/in/marioohashi/" target="_blank" rel="noreferrer">
              <span className="sb-contact-icon">in</span> LinkedIn <span className="sb-ext">↗</span>
            </a>
            <a href="https://github.com/marioohashi" target="_blank" rel="noreferrer">
              <span className="sb-contact-icon">⌘</span> GitHub <span className="sb-ext">↗</span>
            </a>
            <a href="mailto:mario.ohashi@gmail.com">
              <span className="sb-contact-icon">@</span> Email me <span className="sb-ext">↗</span>
            </a>
            <p className="sb-hand">replies within a day or two ✎</p>
          </div>
        </Drop>

        {/* <Drop inView rotate={0} delay={0.1}>
          <form className="sb-paper sb-notepad" onSubmit={handleContactSubmit}>
            <span className="sb-tape sb-tape-top" />
            <p className="sb-hand sb-notepad-title">Leave a note</p>
            <label>
              <span className="sb-mono">Your name</span>
              <input name="name" autoComplete="name" placeholder="Adventurer" required maxLength={80} />
            </label>
            <label>
              <span className="sb-mono">Your email</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
            </label>
            <label>
              <span className="sb-mono">Your message</span>
              <textarea name="message" placeholder="What's the quest?" rows={3} required maxLength={2000} />
            </label>
            <button className="sb-btn sb-btn-ink" type="submit">Send the note <span aria-hidden="true">↗</span></button>
            <p className="sb-mono sb-hint">Opens your mail app — nothing is stored here.</p>
          </form>
        </Drop> */}

        <Drop inView rotate={0} delay={0.2} className="sb-contact-wide">
          <aside className="sb-terminal" aria-labelledby="ai-assistant-title">
            {/* <span className="sb-tape sb-tape-right" />
            <div className="sb-code-bar"><i /><i /><i /> <span id="ai-assistant-title">ask-mario.ai</span></div>
            <div className="sb-terminal-body sb-mono">
              <p><b>&gt;</b> Ask me about Mario&apos;s career, stack, and projects.</p>
              <p className="dim">An assistant trained on my profile is coming soon.</p>
              <div className="sb-ai-input">
                <input disabled placeholder="Coming soon…" aria-label="Ask the AI assistant (coming soon)" />
                <button type="button" disabled>Ask</button>
              </div>
            </div> */}
            <InteractiveTerminal />
            {/* <p className="sb-hand sb-annot sb-annot-ai">
              <Arrow className="sb-annot-arrow" flip /> in progress!
            </p> */}
          </aside>
        </Drop>
      </div>
    </section>
  );
}
