# kidum-digital — guide for Claude Code

Marketing website of Kidum Digital. Owner: Barak (info@kidum.digital). Always answer the owner in Hebrew, in simple, beginner-friendly language with clear step-by-step instructions.

## Stack
- Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + framer-motion.
- Page: `app/page.tsx`, layout: `app/layout.tsx`, styles: `app/globals.css`.
- Sections live in `components/` (Navbar, Hero, Services, HowItWorks, Portfolio, CardCarousel, Stats, Testimonials, Contact, Footer).

## Commands
- Install: `npm install`
- Local preview: `npm run dev` → http://localhost:3000
- Production build check: `npm run build` (must pass before asking to publish)
- Lint: `npm run lint`

## Workflow rules (owner's decision — always follow)
1. Never commit directly to `main`. Every change goes on its own branch and a pull request.
2. Show every change for review first (local preview or a staging/preview link) before it goes live.
3. Run `npm run build` and check the pages before saying a change is ready.
4. Never merge to `main` or deploy to the real site without the owner's explicit approval.
5. Merging to `main` = publishing to the live site.

## Tools available
- Skills in `.claude/skills/` (ui-ux-pro-max, ui-styling, design-system, design, brand, slides, banner-design) — use them for any design/UI work.
- MCP server `21st` (`.mcp.json`) for ready-made UI components. Searching is free; 21st AI generation uses paid credits — ask the owner before using it.

## Rules
- Never put API keys or secrets in the repo. Keys live in environment variables / environment secrets only.
- Do not commit `.next/`, `node_modules/` or `.DS_Store` (already in `.gitignore`).
