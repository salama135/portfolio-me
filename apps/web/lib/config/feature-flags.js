/**
 * Env-driven demo toggles. Any `NEXT_PUBLIC_DEMO_*` key omitted or non-"0" means **on**.
 * Per-demo `featureFlag` in `demos.json` maps to `NEXT_PUBLIC_DEMO_<FLAG>` (uppercase flag in JSON).
 * Otherwise the demo's `category` selects a family key below.
 */

const CATEGORY_ENV = {
  immersive: 'NEXT_PUBLIC_DEMO_IMMERSIVE',
  augmented: 'NEXT_PUBLIC_DEMO_AUGMENTED',
  three_d: 'NEXT_PUBLIC_DEMO_THREE_D',
  creative: 'NEXT_PUBLIC_DEMO_CREATIVE',
  mobile: 'NEXT_PUBLIC_DEMO_MOBILE',
};

function envIsOn(key) {
  return process.env[key] !== '0';
}

/**
 * @param {{ category: keyof typeof CATEGORY_ENV, featureFlag?: string }} demo
 */
export function isDemoExperienceEnabled(demo) {
  const key = demo.featureFlag ? `NEXT_PUBLIC_DEMO_${demo.featureFlag}` : CATEGORY_ENV[demo.category];
  if (!key) return true;
  return envIsOn(key);
}

/**
 * @returns {{ immersive: boolean, augmented: boolean, three_d: boolean, creative: boolean, mobile: boolean }}
 */
export function getDemoFeatureFlags() {
  return {
    immersive: envIsOn('NEXT_PUBLIC_DEMO_IMMERSIVE'),
    augmented: envIsOn('NEXT_PUBLIC_DEMO_AUGMENTED'),
    three_d: envIsOn('NEXT_PUBLIC_DEMO_THREE_D'),
    creative: envIsOn('NEXT_PUBLIC_DEMO_CREATIVE'),
    mobile: envIsOn('NEXT_PUBLIC_DEMO_MOBILE'),
  };
}
