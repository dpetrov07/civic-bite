# CivicBite

CivicBite is an AI-powered, Duolingo-style civic participation app for local democracy. It turns confusing local issues into short 3-minute civic missions with neutral summaries, both-sides explanations, tradeoff sliders, community pulse results, friend comparison, and editable public comment drafting.

## Features

- Home, Dashboard, Mission, Profile, Friend Compare, and Admin AI Finder pages
- Seed demo issue: **Protected Bike Lanes Near Campus** in College Park, MD
- Guided mission flow with summary, both sides, tradeoff questions, pulse, and next steps
- Tradeoff sliders saved in `localStorage`
- Civic Profile with top values, streak, completed missions, badges, and recent responses
- Community Pulse with mock aggregate support / oppose / unsure data
- Editable Public Comment Helper with copy button
- Friend Compare using a mock invite code and demo friend
- Admin AI Issue Finder for pasted civic source text
- AI service abstraction with mock fallback when no API key is configured

## Run Locally

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open:

```bash
http://127.0.0.1:5173/
```

## Build / Typecheck

```bash
npm run build
npm run lint
```

## Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Optional:

```bash
VITE_OPENAI_API_KEY=your_api_key_here
VITE_AI_MODEL=gpt-4o-mini
```

If no API key is provided, the app still works using mock AI responses.

## What Is Mocked

- Community Pulse aggregate data
- Demo friend responses
- Civic profile scoring logic
- AI outputs when `VITE_OPENAI_API_KEY` is not configured
- Generated mission creation from extracted admin issues

## What Is Functional

- Full frontend navigation
- Mission flow from start to finish
- Slider responses persisted in `localStorage`
- Civic Profile updates from saved responses
- Editable public comment generation and copy flow
- Friend comparison page
- Admin issue extraction with mock fallback

## Demo Script

1. Start on the Home page and explain that CivicBite makes local democracy understandable in 3 minutes.
2. Open Today’s Mission for protected bike lanes near campus.
3. Show the neutral summary and both-sides explanation.
4. Move the tradeoff sliders and save responses.
5. Show Community Pulse and Civic Profile.
6. Open the Public Comment Helper and emphasize that comments are editable and never auto-submitted.
7. Open Friend Compare to show respectful disagreement and a possible compromise.
8. Open Admin AI Finder to show how pasted civic source text becomes structured local issues.

## Tech Stack

- React
- Vite
- TypeScript
- React Router
- Lucide icons
- CSS modules via plain `src/styles.css`
