# Private demos

Standalone HTML pages for the password-protected collection at `/demos/private`.

- One file per demo, named `<slug>.html`. Dropping a file here is enough to list it; an entry in
  `content/private-demos.json` with the same slug overrides the title and copy read from the page.
- Files here are not under `public/`, so they are only reachable through the gated route
  `app/demos/private/[slug]/raw/route.js`, which checks the unlock cookie before serving them.
- A registered slug without a file shows a "not added yet" notice instead of the demo.
- To add a Claude artifact, ask Claude Code to "add this artifact to my demos: <link>" (skill: add-artifact-demo).
- Set `PRIVATE_DEMOS_PASSWORD` in the server environment (Netlify site settings or `.env.local`).
