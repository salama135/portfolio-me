import Link from 'next/link';
import { HighlightsList } from '../../components/highlights-list.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadHighlights } from '../../lib/content/load/highlights.js';
import { loadSiteProfile } from '../../lib/content/load/site-profile.js';

export const metadata = {
  title: 'About',
  description: 'Background and how I work.',
};

export default async function AboutPage() {
  const [profile, highlights] = await Promise.all([loadSiteProfile(), loadHighlights()]);

  return (
    <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
      <h1>About</h1>
      <p className="mt-5 max-w-[62ch] text-pretty text-[19px] font-semibold leading-snug text-text-1">{profile.tagline}</p>
      <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.47] text-text-1">
        {profile.roles.join(' · ')}: {profile.seo?.description ?? 'Engineering, instruction, and playful systems.'}
      </p>

      <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.47] text-text-1">
        Hiring or collaboration: <Link href={ROUTES.contact}>Contact</Link> (email and calendar),{' '}
        <Link href={ROUTES.mentoring}>Mentoring</Link> for session shapes, and <Link href={ROUTES.links}>Links</Link> for every
        profile in one list. <Link href={ROUTES.resume}>Resume</Link> and <Link href={ROUTES.projects}>Projects</Link> carry
        the evidence.
      </p>
      <p>
        Skills and AI Frameworks 
https://github.com/github/spec-kit
https://developer.microsoft.com/blog/spec-driven-development-spec-kit
SDD: Spec driven development 
A new of development using agentic ai tools like Claude code and cursor 
https://agents.md/
Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project.
https://agentskills.io/home
A standardized way to give AI agents new capabilities and expertise.
https://www.langchain.com/langgraph
Design agents that reliably handle complex tasks with LangGraph, an agent runtime and low-level orchestration framework.
https://smithery.ai/
Connect agents to thousands of tools and services. Auth, credentials, and sessions handled for you.
https://graphifylabs.ai/

GitHub Repos
https://github.com/JuliusBrussee/caveman  🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens by talking like caveman
https://github.com/thedotmack/claude-mem  A Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it with AI (using Claude's agent-sdk), and injects relevant context back into future sessions.
https://github.com/karpathy/autoresearch  AI agents running research on single-GPU nanochat training automatically
https://github.com/garrytan/gstack  Use Garry Tan's exact Claude Code setup: 23 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA
https://github.com/anthropics/skills
https://github.com/github/awesome-copilot
https://github.com/alirezarezvani/claude-skills
https://github.com/ComposioHQ/awesome-claude-skills
https://github.com/K-Dense-AI/scientific-agent-skills
https://github.com/msitarzewski/agency-agents?tab=readme-ov-file
https://github.com/safishamsi/graphify  AI coding assistant skill (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, and more). Turn any folder of code, SQL schemas, docs, papers, images, or videos into a queryable knowledge graph. App code + database schema + infrastructure in one graph.

UI/UX using Design
https://getdesign.md/  design system of famous companies like apple 
https://www.shadcn.io/ 
https://impeccable.style/  make the ui 100 time better using your own design system
https://docs.copilotkit.ai/  use ai inside your apps 

Happy Coding or Happy Prompting 😂
Best Regards 
      </p>

      <section className="mt-12 max-w-[62ch]">
        <h2 className="text-xl font-semibold text-apple-ink">How I work</h2>
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">
          I bias toward small, reviewable changes, contracts at the boundary (schemas, types, API shapes), and telemetry you can
          actually read when something misbehaves in production.
        </p>
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">
          Teaching forced the same habit: make the invisible visible, keep exercises honest about tradeoffs, and never confuse
          clever with clear.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-apple-ink">Highlights</h2>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-apple-gray-secondary">
          Curated wins and signals; edit <code>content/highlights.json</code> to tune the story.
        </p>
        <HighlightsList highlights={highlights} />
      </section>
    </div>
  );
}
