import { Link } from "react-router-dom";
import { Check, MessageSquareText, Send, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import CommunityPulse from "../components/CommunityPulse";
import PublicCommentHelper from "../components/PublicCommentHelper";
import TradeoffSlider from "../components/TradeoffSlider";
import { demoIssue, demoPulse, tradeoffQuestions } from "../data/seed";
import { averageResponse, getIssueResponses, responseLabel, saveResponse } from "../services/storage";

const steps = ["Summary", "Both sides", "Tradeoffs", "Pulse", "Next step"];

export default function MissionPage() {
  const existing = getIssueResponses(demoIssue.id);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(tradeoffQuestions.map((question) => [question.id, existing.find((r) => r.questionId === question.id)?.value ?? 50])),
  );
  const [showComment, setShowComment] = useState(false);

  const responses = useMemo(
    () =>
      tradeoffQuestions.map((question) => ({
        issueId: demoIssue.id,
        questionId: question.id,
        value: values[question.id] ?? 50,
        answeredAt: new Date().toISOString(),
      })),
    [values],
  );
  const average = averageResponse(responses);

  function saveAll() {
    responses.forEach(saveResponse);
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  return (
    <div className="page mission-page">
      <div className="mission-header">
        <div>
          <p className="eyebrow">Daily Civic Mission • 3 minutes</p>
          <h1>{demoIssue.title}</h1>
          <p>{demoIssue.location}</p>
        </div>
        <div className="progress-ring">{step + 1}/{steps.length}</div>
      </div>

      <div className="stepper">
        {steps.map((item, index) => (
          <button key={item} className={index <= step ? "done" : ""} onClick={() => setStep(index)}>
            {index < step && <Check size={15} />}
            <span>{item}</span>
          </button>
        ))}
      </div>

      {step === 0 && (
        <section className="panel mission-section">
          <p className="eyebrow">Neutral summary</p>
          <h2>What is happening?</h2>
          <p>{demoIssue.summary}</p>
          <div className="info-grid">
            <Info label="Who is affected" value={demoIssue.affectedPeople.join(", ")} />
            <Info label="Why it matters" value={demoIssue.whyItMatters} />
            <Info label="Coming next" value={demoIssue.nextAction} />
          </div>
          <button className="primary-button" onClick={() => setStep(1)}>Review both sides</button>
        </section>
      )}

      {step === 1 && (
        <section className="two-column">
          <article className="panel">
            <p className="eyebrow">Supporters say</p>
            <h2>{demoIssue.supportersSay}</h2>
          </article>
          <article className="panel">
            <p className="eyebrow">Opponents say</p>
            <h2>{demoIssue.opponentsSay}</h2>
          </article>
          <article className="panel wide">
            <p className="eyebrow">Key tradeoff</p>
            <h2>{demoIssue.keyTradeoff}</h2>
            <p><strong>Possible compromise:</strong> {demoIssue.possibleCompromise}</p>
            <button className="primary-button" onClick={() => setStep(2)}>Answer tradeoffs</button>
          </article>
        </section>
      )}

      {step === 2 && (
        <section className="panel mission-section">
          <div className="section-heading">
            <p className="eyebrow">Your view</p>
            <h2>Nuance beats yes-or-no</h2>
            <p>Your answers stay in this browser for the demo.</p>
          </div>
          {tradeoffQuestions.map((question) => (
            <TradeoffSlider
              key={question.id}
              question={question}
              value={values[question.id] ?? 50}
              onChange={(value) => setValues((current) => ({ ...current, [question.id]: value }))}
            />
          ))}
          <div className="result-callout">Overall: <strong>{average} - {responseLabel(average)}</strong></div>
          <button className="primary-button" onClick={saveAll}>Save and see pulse</button>
        </section>
      )}

      {step === 3 && (
        <div className="mission-stack">
          <CommunityPulse pulse={demoPulse} userAverage={average} />
          <button className="primary-button" onClick={() => setStep(4)}>Choose next step</button>
        </div>
      )}

      {step === 4 && (
        <section className="next-actions">
          <article className="panel">
            <MessageSquareText size={28} />
            <h2>Draft a public comment</h2>
            <p>Generate editable language that reflects your stance and concerns.</p>
            <button className="secondary-button" onClick={() => setShowComment((current) => !current)}>
              <Send size={16} />
              {showComment ? "Hide helper" : "Open helper"}
            </button>
          </article>
          <article className="panel">
            <UsersRound size={28} />
            <h2>Invite a friend</h2>
            <p>Use mock invite code <strong>BITE-204</strong> to compare two views respectfully.</p>
            <Link className="primary-button" to="/compare">Compare views</Link>
          </article>
          {showComment && <PublicCommentHelper />}
        </section>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-box">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}
