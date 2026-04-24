/**
 * Env-driven demo family toggles. Set NEXT_PUBLIC_DEMO_* to "0" to hide.
 * @returns {{ immersive: boolean, augmented: boolean, three_d: boolean, creative: boolean }}
 */
export function getDemoFeatureFlags() {
  const isOn = (key) => process.env[key] !== '0';

  return {
    immersive: isOn('NEXT_PUBLIC_DEMO_IMMERSIVE'),
    augmented: isOn('NEXT_PUBLIC_DEMO_AUGMENTED'),
    three_d: isOn('NEXT_PUBLIC_DEMO_THREE_D'),
    creative: isOn('NEXT_PUBLIC_DEMO_CREATIVE'),
  };
}
