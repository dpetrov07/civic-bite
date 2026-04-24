import { useState } from "react";
import { Bot, FilePlus2, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { sampleSourceText } from "../data/seed";
import { aiModeLabel, findLocalIssues } from "../services/ai";
import type { ExtractedIssue } from "../types";

export default function AdminPage() {
  const [sourceText, setSourceText] = useState(sampleSourceText);
  const [issues, setIssues] = useState<ExtractedIssue[]>([]);
  const [loading, setLoading] = useState(false);

  async function extract() {
    setLoading(true);
    const next = await findLocalIssues(sourceText);
    setIssues(next);
    setLoading(false);
  }

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">Admin AI finder</p>
        <h1>Turn civic source text into missions</h1>
        <p>{aiModeLabel()}</p>
      </div>
      <section className="admin-layout">
        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Source text</p>
            <h2>Paste a hearing notice, agenda, or local forum post</h2>
          </div>
          <textarea value={sourceText} onChange={(event) => setSourceText(event.target.value)} rows={12} />
          <button className="primary-button" onClick={extract} disabled={loading}>
            <Wand2 size={16} />
            {loading ? "Finding issues..." : "Find local issues"}
          </button>
        </div>
        <div className="admin-results">
          {issues.length === 0 ? (
            <div className="empty-card">
              <Bot size={34} />
              <h2>No extracted issues yet</h2>
              <p>Run the finder to generate structured issue cards. Without an API key, mock AI responses are used.</p>
            </div>
          ) : (
            issues.map((issue) => (
              <article className="issue-card" key={`${issue.title}-${issue.location}`}>
                <div className="card-kicker">
                  <span>{issue.sourceType}</span>
                  <span className={`urgency ${issue.urgency.toLowerCase()}`}>{issue.urgency}</span>
                </div>
                <h3>{issue.title}</h3>
                <p><strong>{issue.location}</strong></p>
                <p>{issue.description}</p>
                <p>{issue.whyItMatters}</p>
                <div className="result-callout">{issue.suggestedTradeoffQuestion}</div>
                <Link className="secondary-button" to="/mission">
                  <FilePlus2 size={16} />
                  Generate mission
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
