# Portfolio mobile (Expo)

Companion app for the web demo hub. From the monorepo root:

```bash
npm run mobile
```

Or:

```bash
cd apps/mobile
npx expo start
```

Open **Expo Go** on a phone, scan the Metro QR, then use **Open flagship demo** on the home screen or open a deep link such as `portfolio://demo/hello` (scheme matches `app.json` and web `content/demos.json`).

No accounts or backend: UI state is local only.

## Monorepo note (Metro)

This repo shares `node_modules` with Next.js. If `expo start` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` for `metro/src/lib/TerminalReporter`, the root lockfile hoisted **Metro 0.84+** while **@expo/cli** still deep-imports Metro internals. The root **`package.json` `overrides`** pin **Metro 0.82.x** and **React Native 0.79.6** so Expo and React Navigation stay compatible. After changing overrides, run **`npm install`** from the repo root.

## Entry file (`main`)

`package.json` sets **`main`** to **`index.js`** (not `node_modules/expo/AppEntry.js`). When `expo` is hoisted to the repo root, the default `AppEntry.js` inside `expo` resolves `../../App` from the wrong directory. The local **`index.js`** registers `./App` explicitly.
