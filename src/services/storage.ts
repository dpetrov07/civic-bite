import { badges, demoIssue } from "../data/seed";
import type { CivicProfile, UserResponse } from "../types";

const RESPONSE_KEY = "civicbite.responses";
const COMMENT_KEY = "civicbite.comment";

export function getResponses(): UserResponse[] {
  try {
    const raw = localStorage.getItem(RESPONSE_KEY);
    return raw ? (JSON.parse(raw) as UserResponse[]) : [];
  } catch {
    return [];
  }
}

export function saveResponse(response: UserResponse) {
  const existing = getResponses().filter(
    (item) => !(item.issueId === response.issueId && item.questionId === response.questionId),
  );
  localStorage.setItem(RESPONSE_KEY, JSON.stringify([...existing, response]));
}

export function getIssueResponses(issueId = demoIssue.id) {
  return getResponses().filter((response) => response.issueId === issueId);
}

export function averageResponse(responses: UserResponse[]) {
  if (!responses.length) return 50;
  return Math.round(responses.reduce((sum, response) => sum + response.value, 0) / responses.length);
}

export function responseLabel(value: number) {
  if (value <= 20) return "Strongly oppose";
  if (value <= 40) return "Lean oppose";
  if (value <= 60) return "Unsure / mixed";
  if (value <= 80) return "Lean support";
  return "Strongly support";
}

export function saveDraftComment(comment: string) {
  localStorage.setItem(COMMENT_KEY, comment);
}

export function getDraftComment() {
  return localStorage.getItem(COMMENT_KEY) ?? "";
}

export function buildProfile(): CivicProfile {
  const responses = getResponses();
  const completedMissions = getIssueResponses(demoIssue.id).length >= 3 ? 1 : 0;
  const score = averageResponse(getIssueResponses(demoIssue.id));
  const topValues =
    score >= 61
      ? ["Safety", "Sustainability", "Public transit"]
      : score <= 40
        ? ["Affordability", "Accessibility", "Community trust"]
        : ["Community trust", "Safety", "Fiscal responsibility"];

  return {
    topValues,
    completedMissions,
    streak: completedMissions ? 1 : 0,
    badges: completedMissions ? badges.slice(0, 3) : badges.slice(0, 1),
    recentResponses: responses.slice(-5).reverse(),
    interests: ["Transportation", "Campus safety", "Local budgets"],
  };
}
