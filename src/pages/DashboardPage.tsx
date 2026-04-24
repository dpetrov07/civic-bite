import { Link } from "react-router-dom";
import { CheckCircle2, Flame, Timer, UsersRound } from "lucide-react";
import IssueCard from "../components/IssueCard";
import MetricCard from "../components/MetricCard";
import { demoIssue, recommendedIssues } from "../data/seed";
import { buildProfile } from "../services/storage";

export default function DashboardPage() {
  const profile = buildProfile();

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">Today's dashboard</p>
        <h1>Ready for a quick civic mission?</h1>
        <p>One local issue, one tradeoff, one small way to participate.</p>
      </div>
      <section className="metrics-grid">
        <MetricCard label="Civic streak" value={`${profile.streak} day`} detail="Keep it going" icon={<Flame size={20} />} />
        <MetricCard label="Completed" value={`${profile.completedMissions}`} detail="Mission finished" icon={<CheckCircle2 size={20} />} />
        <MetricCard label="Time today" value="3 min" detail="Estimated" icon={<Timer size={20} />} />
        <MetricCard label="Community" value="62%" detail="Support in pulse" icon={<UsersRound size={20} />} />
      </section>

      <section className="dashboard-layout">
        <div className="panel featured-issue">
          <div className="section-heading">
            <p className="eyebrow">Local issue of the day</p>
            <h2>{demoIssue.title}</h2>
            <p>{demoIssue.summary}</p>
          </div>
          <div className="tag-row">
            {demoIssue.values.map((value) => (
              <span className="soft-tag" key={value}>{value}</span>
            ))}
          </div>
          <Link className="primary-button" to="/mission">Start mission</Link>
        </div>
        <div className="issue-list">
          {recommendedIssues.slice(1).map((issue) => (
            <IssueCard key={issue.id} issue={issue} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
