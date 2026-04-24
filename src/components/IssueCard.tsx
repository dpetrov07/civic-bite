import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import type { CivicIssue } from "../types";

interface IssueCardProps {
  issue: CivicIssue;
  compact?: boolean;
}

export default function IssueCard({ issue, compact = false }: IssueCardProps) {
  return (
    <article className={`issue-card ${compact ? "compact" : ""}`}>
      <div className="card-kicker">
        <span>{issue.sourceType}</span>
        <span className={`urgency ${issue.urgency.toLowerCase()}`}>{issue.urgency}</span>
      </div>
      <h3>{issue.title}</h3>
      <p className="location">
        <MapPin size={15} />
        {issue.location}
      </p>
      <p>{issue.description}</p>
      <Link className="text-link" to="/mission">
        Open mission <ArrowRight size={16} />
      </Link>
    </article>
  );
}
