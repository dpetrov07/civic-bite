import { Link } from "react-router-dom";
import { ArrowRight, Bot, MessageSquareText, Scale, Trophy } from "lucide-react";
import type { ReactNode } from "react";

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI-powered local democracy</p>
          <h1>CivicBite</h1>
          <p className="hero-subtitle">
            Three-minute civic missions that make local issues understandable, balanced, and easier to act on.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/mission">
              Start today's mission <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" to="/admin">
              Try AI issue finder
            </Link>
          </div>
        </div>
        <div className="mission-preview" aria-label="Mission preview">
          <div className="phone-top">
            <span>3 min</span>
            <span>Local Issue</span>
          </div>
          <h2>Protected Bike Lanes Near Campus</h2>
          <div className="mini-progress">
            <span style={{ width: "66%" }} />
          </div>
          <p>Read a neutral summary, weigh the tradeoff, then see how neighbors are thinking.</p>
          <div className="preview-slider">
            <span />
          </div>
          <div className="preview-pills">
            <span>Safety</span>
            <span>Access</span>
            <span>Cost</span>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <Feature icon={<Bot />} title="Find timely issues" text="Paste local source text and extract actionable civic issues." />
        <Feature icon={<Scale />} title="Explain both sides" text="Neutral summaries, key tradeoffs, and possible compromises." />
        <Feature icon={<Trophy />} title="Build civic habits" text="Streaks, badges, and profile insights keep participation approachable." />
        <Feature icon={<MessageSquareText />} title="Draft public comments" text="Editable comments help users speak clearly without auto-submission." />
      </section>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
