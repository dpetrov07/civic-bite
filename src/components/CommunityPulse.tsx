import type { CommunityPulse as Pulse } from "../types";

interface CommunityPulseProps {
  pulse: Pulse;
  userAverage?: number;
}

export default function CommunityPulse({ pulse, userAverage = 50 }: CommunityPulseProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Community Pulse</p>
        <h2>Where neighbors are landing</h2>
      </div>
      <div className="pulse-bars" aria-label="Community pulse results">
        <PulseBar label="Support" value={pulse.support} className="support" />
        <PulseBar label="Oppose" value={pulse.oppose} className="oppose" />
        <PulseBar label="Unsure" value={pulse.unsure} className="unsure" />
      </div>
      <div className="user-marker">Your current average: <strong>{userAverage}</strong></div>
      <div className="tag-row">
        {pulse.topConcerns.map((concern) => (
          <span className="soft-tag" key={concern}>{concern}</span>
        ))}
      </div>
    </section>
  );
}

function PulseBar({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className="pulse-line">
      <span>{label}</span>
      <div className="bar-track">
        <div className={`bar-fill ${className}`} style={{ width: `${value}%` }} />
      </div>
      <strong>{value}%</strong>
    </div>
  );
}
