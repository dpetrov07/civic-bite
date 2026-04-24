import { Award, Flame, Target, Trophy } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { tradeoffQuestions } from "../data/seed";
import { buildProfile, responseLabel } from "../services/storage";

export default function ProfilePage() {
  const profile = buildProfile();

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">Civic profile</p>
        <h1>Your nonpartisan priority map</h1>
        <p>Built from tradeoff answers, not party labels.</p>
      </div>
      <section className="metrics-grid">
        <MetricCard label="Top values" value={profile.topValues[0] ?? "Safety"} detail="Leading signal" icon={<Target size={20} />} />
        <MetricCard label="Missions" value={`${profile.completedMissions}`} detail="Completed" icon={<Trophy size={20} />} />
        <MetricCard label="Streak" value={`${profile.streak} day`} detail="Current" icon={<Flame size={20} />} />
        <MetricCard label="Badges" value={`${profile.badges.length}`} detail="Earned" icon={<Award size={20} />} />
      </section>

      <section className="profile-grid">
        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Values</p>
            <h2>What seems to matter most</h2>
          </div>
          <div className="value-list">
            {profile.topValues.map((value, index) => (
              <div key={value} className="value-row">
                <span>{index + 1}</span>
                <strong>{value}</strong>
                <div className="bar-track"><div className="bar-fill support" style={{ width: `${88 - index * 16}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Badges</p>
            <h2>Participation milestones</h2>
          </div>
          <div className="badge-grid">
            {profile.badges.map((badge) => (
              <article key={badge.id} className="badge-card">
                <Award size={22} />
                <strong>{badge.label}</strong>
                <span>{badge.description}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="panel wide">
          <div className="section-heading">
            <p className="eyebrow">Recent responses</p>
            <h2>Your latest tradeoffs</h2>
          </div>
          {profile.recentResponses.length ? (
            <div className="response-list">
              {profile.recentResponses.map((response) => {
                const question = tradeoffQuestions.find((item) => item.id === response.questionId);
                return (
                  <div key={`${response.questionId}-${response.answeredAt}`} className="response-row">
                    <span>{question?.prompt ?? response.questionId}</span>
                    <strong>{response.value} - {responseLabel(response.value)}</strong>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-state">Complete the daily mission to populate your profile.</p>
          )}
        </div>
      </section>
    </div>
  );
}
