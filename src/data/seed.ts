import type { Badge, CivicIssue, CommunityPulse, FriendUser, TradeoffQuestion, UserResponse } from "../types";

export const demoIssue: CivicIssue = {
  id: "bike-lanes-campus",
  title: "Protected Bike Lanes Near Campus",
  location: "College Park, MD",
  description:
    "The city is considering protected bike lanes near campus after residents, students, and local businesses raised safety and access concerns.",
  whyItMatters:
    "The decision could change how people move through busy campus-area streets and how curb space is shared.",
  sourceType: "Council agenda",
  urgency: "Medium",
  suggestedTradeoffQuestion: "Would you support protected bike lanes if they removed some street parking?",
  summary:
    "The city is considering protected bike lanes near campus to improve safety for students, cyclists, and pedestrians. Supporters argue the lanes could reduce crashes and encourage safer transportation. Opponents worry about losing street parking and increasing traffic congestion. The next step is for city staff and council members to review feedback before deciding whether to pilot the change.",
  affectedPeople: ["Students", "Residents", "Cyclists", "Pedestrians", "Local businesses"],
  nextAction: "Public comment and council review before a possible pilot vote.",
  supportersSay: "Protected lanes make roads safer and encourage walking, biking, and transit.",
  opponentsSay: "Removing parking could inconvenience residents, students, and local businesses.",
  keyTradeoff: "Safety and sustainable transportation vs. parking convenience and road access.",
  possibleCompromise:
    "Start with a 6-month pilot on the busiest blocks and measure safety, traffic, and parking impact before expanding.",
  values: ["Safety", "Sustainability", "Public transit", "Accessibility", "Affordability"],
};

export const recommendedIssues: CivicIssue[] = [
  demoIssue,
  {
    ...demoIssue,
    id: "library-hours",
    title: "Extended Library Evening Hours",
    sourceType: "Public notice",
    urgency: "Low",
    location: "College Park, MD",
    description: "The library board is reviewing whether to keep two branches open later during exam season.",
    whyItMatters: "Longer hours could help students and shift workers, but would require staffing and utility costs.",
    suggestedTradeoffQuestion: "Would you support longer library hours if it increased annual operating costs?",
    summary:
      "Local library leaders are considering later evening hours during busy academic periods. People who support the change say it could expand study access and help residents who work during the day. People with concerns point to staffing, security, and budget limits.",
    keyTradeoff: "Access to public learning space vs. higher operating costs.",
    possibleCompromise: "Try later hours at one branch for eight weeks and review usage data.",
    values: ["Education", "Accessibility", "Fiscal responsibility"],
  },
  {
    ...demoIssue,
    id: "stormwater-fee",
    title: "Neighborhood Stormwater Fee Update",
    sourceType: "Council agenda",
    urgency: "High",
    location: "Prince George's County, MD",
    description: "County officials are discussing a small fee increase to repair flood-prone drainage systems.",
    whyItMatters: "The proposal affects household costs and flood resilience in older neighborhoods.",
    suggestedTradeoffQuestion: "Would you support a small monthly fee increase for drainage repairs?",
    summary:
      "County officials are weighing a stormwater fee update to pay for drainage repairs in flood-prone areas. Supporters say preventive repairs can reduce property damage and road closures. Opponents worry about adding costs for residents already facing high bills.",
    keyTradeoff: "Flood protection and infrastructure reliability vs. household affordability.",
    possibleCompromise: "Phase in the fee and add discounts for lower-income households.",
    values: ["Safety", "Affordability", "Sustainability", "Equity"],
  },
];

export const tradeoffQuestions: TradeoffQuestion[] = [
  {
    id: "bike-parking",
    issueId: demoIssue.id,
    prompt: "Would you support protected bike lanes if they removed some street parking?",
    leftLabel: "Keep parking",
    rightLabel: "Prioritize protected lanes",
    valueTags: ["Safety", "Public transit", "Accessibility"],
  },
  {
    id: "bike-pilot",
    issueId: demoIssue.id,
    prompt: "Would you support a 6-month pilot before making the change permanent?",
    leftLabel: "Decide now",
    rightLabel: "Pilot and measure",
    valueTags: ["Community trust", "Safety", "Fiscal responsibility"],
  },
  {
    id: "bike-spending",
    issueId: demoIssue.id,
    prompt: "Would you support the project if it slightly increased local transportation spending?",
    leftLabel: "Avoid new spending",
    rightLabel: "Invest in street changes",
    valueTags: ["Fiscal responsibility", "Sustainability", "Safety"],
  },
];

export const demoPulse: CommunityPulse = {
  issueId: demoIssue.id,
  support: 62,
  oppose: 24,
  unsure: 14,
  topConcerns: ["parking access", "safety", "cost", "accessibility"],
  commonValues: ["Safety", "Accessibility", "Affordability"],
};

export const badges: Badge[] = [
  { id: "first-mission", label: "First Mission", description: "Completed your first 3-minute civic mission." },
  { id: "balanced-thinker", label: "Balanced Thinker", description: "Reviewed both sides before answering." },
  { id: "community-voice", label: "Community Voice", description: "Drafted an editable public comment." },
  { id: "civic-streak", label: "Civic Streak", description: "Kept a civic learning streak alive." },
  { id: "bridge-builder", label: "Bridge Builder", description: "Compared views respectfully with a friend." },
];

const friendResponses: UserResponse[] = [
  { issueId: demoIssue.id, questionId: "bike-parking", value: 38, answeredAt: new Date().toISOString() },
  { issueId: demoIssue.id, questionId: "bike-pilot", value: 82, answeredAt: new Date().toISOString() },
  { issueId: demoIssue.id, questionId: "bike-spending", value: 42, answeredAt: new Date().toISOString() },
];

export const demoFriend: FriendUser = {
  id: "friend-riley",
  name: "Riley",
  values: ["Safety", "Affordability", "Community trust"],
  responses: friendResponses,
};

export const sampleSourceText =
  "Public hearing notice: College Park council will discuss protected bike lanes near campus after concerns about crashes, congestion, and curb access. Residents have asked about parking loss, while students and pedestrian advocates requested safer crossings. Staff may recommend a six-month pilot on the busiest blocks.";
