export type UrgencyLevel = "Low" | "Medium" | "High";
export type Stance = "support" | "oppose" | "unsure";

export interface CivicIssue {
  id: string;
  title: string;
  location: string;
  description: string;
  whyItMatters: string;
  sourceType: string;
  urgency: UrgencyLevel;
  suggestedTradeoffQuestion: string;
  summary: string;
  affectedPeople: string[];
  nextAction: string;
  supportersSay: string;
  opponentsSay: string;
  keyTradeoff: string;
  possibleCompromise: string;
  values: string[];
}

export interface TradeoffQuestion {
  id: string;
  issueId: string;
  prompt: string;
  leftLabel: string;
  rightLabel: string;
  valueTags: string[];
}

export interface UserResponse {
  issueId: string;
  questionId: string;
  value: number;
  answeredAt: string;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
}

export interface CommunityPulse {
  issueId: string;
  support: number;
  oppose: number;
  unsure: number;
  topConcerns: string[];
  commonValues: string[];
}

export interface CivicProfile {
  topValues: string[];
  completedMissions: number;
  streak: number;
  badges: Badge[];
  recentResponses: UserResponse[];
  interests: string[];
}

export interface FriendUser {
  id: string;
  name: string;
  values: string[];
  responses: UserResponse[];
}

export interface FriendComparison {
  agreements: string[];
  differences: string[];
  sharedValues: string[];
  possibleCompromise: string;
  discussionStarter: string;
}

export interface ExtractedIssue {
  title: string;
  location: string;
  description: string;
  whyItMatters: string;
  sourceType: string;
  urgency: UrgencyLevel;
  suggestedTradeoffQuestion: string;
}
