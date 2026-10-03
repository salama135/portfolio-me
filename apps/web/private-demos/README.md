# Private demos

Standalone HTML pages for the password-protected collection at `/demos/private`.

- One file per demo, named `<slug>.html`, where the slug matches an entry in `content/private-demos.json`.
- Files here are not under `public/`, so they are only reachable through the gated route
  `app/demos/private/[slug]/raw/route.js`, which checks the unlock cookie before serving them.
- A registered slug without a file shows a "not added yet" notice instead of the demo.
- Set `PRIVATE_DEMOS_PASSWORD` in the server environment (Netlify site settings or `.env.local`).
