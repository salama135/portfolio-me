# Product

## Register

brand

## Users

- **Primary**: Recruiters, hiring managers, and technical peers evaluating whether to interview or hire you for software engineering, instruction, or game development roles. Often on a short timer, skimming from a link on mobile or desktop.
- **Secondary**: Fellow engineers and students browsing for collaboration, learning, or inspiration.

They arrive with a practical job: form a quick, accurate picture of who you are, what you build, and how to start a conversation.

## Product Purpose

A personal portfolio and demo hub that proves craft and range: static narrative (projects, writing, life context) plus optional live demos (immersive, AR, 3D, creative coding, mobile) that work without accounts or a database. Success is measured in clarity, trust, and a low-friction path to hire or follow up, not in vanity metrics.

## Brand Personality

- **Voice**: Direct, capable, warm without being casual to the point of sloppy. You are the expert in the room, still approachable.
- **Three words**: **Capable**, **curious**, **precise**.
- **Emotional goals**: Confidence (they know you can ship), curiosity (they want to see the demos), respect for their time (scannable hierarchy, obvious CTAs).

## Anti-references

- Generic “AI portfolio” look: interchangeable purple gradients, glass cards on glass, stock hero illustrations, meaningless metrics blocks.
- SaaS landing clichés: giant meaningless numbers, gradient text, side-stripe accent borders on every card.
- Walls of dense monospace with no hierarchy (readable code samples are fine; unreadable walls are not).
- Motion for decoration only: bouncing loaders, elastic easing, layout-thrashing animations.
- Anything that hides contact or hiring paths behind clever UI.

## Design Principles

1. **Hire path first**: A visitor can answer “who is this, what do they want, how do I reach them?” before scrolling through novelty.
2. **Show, then tell**: Demos and visuals carry proof; copy supports them, not the other way around.
3. **Isolation over spectacle**: Heavy demos must not break the rest of the site; failures degrade with a clear message.
4. **Motion with consent**: Respect reduced motion; never animate layout properties for effect; ease-out curves only.
5. **Accessibility as credibility**: Keyboard, focus, contrast, and alt text are part of the “this person ships quality” signal.

## Accessibility & Inclusion

- Target **WCAG 2.2 AA** for the marketing shell; demos document honest limitations (e.g. XR, camera) and offer fallbacks.
- Visible focus states, skip link, sensible tab order on global chrome.
- `prefers-reduced-motion`: shell honors it; demos either simplify motion or gate full effects behind explicit start.
- Imagery: meaningful `alt` text; no essential information conveyed by color alone.
