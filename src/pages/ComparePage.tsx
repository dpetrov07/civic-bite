import { useEffect, useState } from "react";
import { Handshake, Link as LinkIcon } from "lucide-react";
import { demoFriend, demoIssue } from "../data/seed";
import { compareFriendResponses } from "../services/ai";
import { getIssueResponses } from "../services/storage";
import type { FriendComparison } from "../types";

export default function ComparePage() {
  const [comparison, setComparison] = useState<FriendComparison | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const responses = getIssueResponses(demoIssue.id);
    void compareFriendResponses({
      id: "demo-user",
      name: "You",
      values: ["Safety", "Sustainability", "Community trust"],
      responses: responses.length ? responses : [
        { issueId: demoIssue.id, questionId: "bike-parking", value: 72, answeredAt: new Date().toISOString() },
        { issueId: demoIssue.id, questionId: "bike-pilot", value: 88, answeredAt: new Date().toISOString() },
        { issueId: demoIssue.id, questionId: "bike-spending", value: 64, answeredAt: new Date().toISOString() },
      ],
    }).then(setComparison);
  }, []);

  async function copyInvite() {
    await navigator.clipboard.writeText("BITE-204");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="page">
      <div className="page-title">
        <p className="eyebrow">Friend compare</p>
        <h1>Same issue, two perspectives</h1>
        <p>Mock invite code compares your answers with Riley's demo responses.</p>
      </div>
      <section className="compare-hero panel">
        <div>
          <p className="eyebrow">Invite code</p>
          <h2>BITE-204</h2>
        </div>
        <button className="secondary-button" onClick={copyInvite}>
          <LinkIcon size={16} />
          {copied ? "Copied" : "Copy invite"}
        </button>
      </section>
      {comparison ? (
        <section className="profile-grid">
          <ComparePanel title="Where you agree" items={comparison.agreements} />
          <ComparePanel title="Where you differ" items={comparison.differences} />
          <ComparePanel title="Shared values" items={comparison.sharedValues} />
          <article className="panel wide bridge-card">
            <Handshake size={30} />
            <p className="eyebrow">Possible bridge</p>
            <h2>{comparison.possibleCompromise}</h2>
            <p><strong>Starter:</strong> {comparison.discussionStarter}</p>
          </article>
        </section>
      ) : (
        <p className="empty-state">Preparing comparison...</p>
      )}
      <section className="panel">
        <p className="eyebrow">Demo user</p>
        <h2>Riley's priorities</h2>
        <div className="tag-row">
          {demoFriend.values.map((value) => (
            <span className="soft-tag" key={value}>{value}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function ComparePanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="panel">
      <h2>{title}</h2>
      <ul className="clean-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
