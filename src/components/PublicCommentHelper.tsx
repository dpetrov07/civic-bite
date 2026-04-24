import { Clipboard, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { demoIssue } from "../data/seed";
import { generatePublicComment } from "../services/ai";
import { getDraftComment, saveDraftComment } from "../services/storage";
import type { Stance } from "../types";

const concerns = ["safety", "parking access", "cost", "accessibility", "resident feedback"];

export default function PublicCommentHelper() {
  const [stance, setStance] = useState<Stance>("support");
  const [selected, setSelected] = useState<string[]>(["safety", "resident feedback"]);
  const [comment, setComment] = useState(getDraftComment());
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!comment) {
      void draft();
    }
  }, []);

  async function draft() {
    setLoading(true);
    const next = await generatePublicComment(stance, selected, demoIssue);
    setComment(next);
    saveDraftComment(next);
    setLoading(false);
  }

  function toggleConcern(concern: string) {
    setSelected((current) =>
      current.includes(concern) ? current.filter((item) => item !== concern) : [...current, concern],
    );
  }

  async function copyComment() {
    await navigator.clipboard.writeText(comment);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="panel comment-helper">
      <div className="section-heading">
        <p className="eyebrow">Writing assistant</p>
        <h2>Editable public comment</h2>
        <p>This drafts text only. CivicBite never submits comments for you.</p>
      </div>
      <div className="segmented" role="group" aria-label="Select stance">
        {(["support", "oppose", "unsure"] as Stance[]).map((item) => (
          <button key={item} className={stance === item ? "selected" : ""} onClick={() => setStance(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="tag-row">
        {concerns.map((concern) => (
          <button
            key={concern}
            className={`choice-chip ${selected.includes(concern) ? "selected" : ""}`}
            onClick={() => toggleConcern(concern)}
          >
            {concern}
          </button>
        ))}
      </div>
      <button className="secondary-button" onClick={draft} disabled={loading}>
        <Wand2 size={16} />
        {loading ? "Drafting..." : "Generate draft"}
      </button>
      <textarea
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
          saveDraftComment(event.target.value);
        }}
        rows={7}
        aria-label="Editable public comment"
      />
      <button className="primary-button" onClick={copyComment}>
        <Clipboard size={16} />
        {copied ? "Copied" : "Copy comment"}
      </button>
    </section>
  );
}
