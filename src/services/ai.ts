import { demoFriend, demoIssue, sampleSourceText, tradeoffQuestions } from "../data/seed";
import type { CivicIssue, ExtractedIssue, FriendComparison, FriendUser, Stance, UserResponse } from "../types";
import { averageResponse, responseLabel } from "./storage";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const model = (import.meta.env.VITE_AI_MODEL as string | undefined) ?? "gpt-4o-mini";

async function callOpenAI<T>(system: string, user: string, fallback: T): Promise<T> {
  if (!apiKey) return fallback;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!response.ok) return fallback;
    const data = await response.json();
    return JSON.parse(data.choices?.[0]?.message?.content ?? "{}") as T;
  } catch {
    return fallback;
  }
}

export function aiModeLabel() {
  return apiKey ? `AI-ready using ${model}` : "Demo mode: mock AI fallback";
}

export async function findLocalIssues(sourceText: string): Promise<ExtractedIssue[]> {
  const text = sourceText.trim() || sampleSourceText;
  const fallback: ExtractedIssue[] = [
    {
      title: "Protected Bike Lanes Near Campus",
      location: "College Park, MD",
      description:
        "The city is considering protected bike lanes near campus after residents and students raised safety, congestion, and access concerns.",
      whyItMatters: "The decision could affect crashes, parking availability, traffic flow, and access to campus businesses.",
      sourceType: text.toLowerCase().includes("hearing") ? "Public notice" : "Council agenda",
      urgency: "Medium",
      suggestedTradeoffQuestion: "Would you support protected bike lanes if they removed some street parking?",
    },
    {
      title: "Six-Month Street Safety Pilot",
      location: "College Park, MD",
      description: "Staff may recommend a temporary pilot on the busiest blocks before a permanent decision.",
      whyItMatters: "A pilot could lower risk while giving the city real data about traffic, safety, and parking impacts.",
      sourceType: "Council agenda",
      urgency: "High",
      suggestedTradeoffQuestion: "Would you support a temporary pilot before a permanent street redesign?",
    },
  ];

  return callOpenAI(
    "Extract timely, local, actionable civic issues from source text. Return JSON with an issues array. Use neutral, plain language.",
    `${text}\n\nReturn { "issues": [{ "title": "", "location": "", "description": "", "whyItMatters": "", "sourceType": "", "urgency": "Low|Medium|High", "suggestedTradeoffQuestion": "" }] }`,
    { issues: fallback },
  ).then((result) => ("issues" in result ? result.issues : fallback));
}

export async function generateNeutralSummary(issue: CivicIssue) {
  return callOpenAI(
    "Create short neutral local civic summaries. No persuasion, party framing, or emotional manipulation.",
    `Summarize this issue as JSON { "summary": "" }: ${JSON.stringify(issue)}`,
    { summary: issue.summary },
  ).then((result) => result.summary);
}

export async function explainBothSides(issue: CivicIssue) {
  return callOpenAI(
    "Explain civic disagreements fairly and neutrally. Return concise JSON.",
    `Return { "supportersSay": "", "opponentsSay": "", "keyTradeoff": "", "possibleCompromise": "" } for ${JSON.stringify(issue)}`,
    {
      supportersSay: issue.supportersSay,
      opponentsSay: issue.opponentsSay,
      keyTradeoff: issue.keyTradeoff,
      possibleCompromise: issue.possibleCompromise,
    },
  );
}

export async function generateTradeoffQuestions(issue: CivicIssue) {
  return Promise.resolve(tradeoffQuestions.filter((question) => question.issueId === issue.id));
}

export async function generatePublicComment(stance: Stance, concerns: string[], issue: CivicIssue) {
  const stanceText =
    stance === "support" ? "support" : stance === "oppose" ? "have concerns about" : "am still weighing";
  const fallback =
    `I ${stanceText} the proposal for ${issue.title.toLowerCase()} because ${concerns.join(", ") || "community impact"} matters to me. ` +
    `I appreciate that the city is considering both safety and access. Please consider ${issue.possibleCompromise.toLowerCase()} and keep residents informed before making a permanent decision.`;

  return callOpenAI(
    "Draft short editable public comments for local civic issues. Do not impersonate people. Do not suggest automatic submission.",
    `Return { "comment": "" } for stance ${stance}, concerns ${concerns.join(", ")}, issue ${JSON.stringify(issue)}`,
    { comment: fallback },
  ).then((result) => result.comment);
}

export async function compareFriendResponses(
  userA: FriendUser,
  userB: FriendUser = demoFriend,
  issue: CivicIssue = demoIssue,
): Promise<FriendComparison> {
  const aAverage = averageResponse(userA.responses);
  const bAverage = averageResponse(userB.responses);
  const sharedValues = userA.values.filter((value) => userB.values.includes(value));
  const fallback: FriendComparison = {
    agreements: [
      `You both see ${issue.title.toLowerCase()} as a real local decision, not just an abstract debate.`,
      "You both support testing ideas with public feedback before making permanent changes.",
    ],
    differences: [
      `${userA.name} is ${responseLabel(aAverage).toLowerCase()}, while ${userB.name} is ${responseLabel(bAverage).toLowerCase()}.`,
      aAverage >= bAverage
        ? `${userA.name} is more comfortable trading some parking convenience for safety improvements.`
        : `${userB.name} is more cautious about losing parking access.`,
    ],
    sharedValues: sharedValues.length ? sharedValues : ["Safety", "Community trust"],
    possibleCompromise: issue.possibleCompromise,
    discussionStarter:
      "What would you need to see during a pilot for this to feel fair, measurable, and responsive to residents?",
  };

  return callOpenAI(
    "Compare two civic perspectives respectfully. Return JSON with agreements, differences, sharedValues, possibleCompromise, discussionStarter.",
    JSON.stringify({ userA, userB, issue }),
    fallback,
  );
}
