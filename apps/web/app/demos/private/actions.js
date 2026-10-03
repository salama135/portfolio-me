'use server';

import { redirect } from 'next/navigation';
import { grantPrivateDemoAccess, isPrivateDemosConfigured, revokePrivateDemoAccess } from '../../../lib/private-demos/auth.js';

/** Only allow redirects back into the private collection. */
function safeNext(value) {
  return typeof value === 'string' && /^\/demos\/private(\/[a-z0-9-]+)?$/.test(value) ? value : '/demos/private';
}

export async function unlockPrivateDemos(_prev, formData) {
  if (!isPrivateDemosConfigured()) {
    return { error: 'The private collection is not configured on this deployment.' };
  }
  const ok = await grantPrivateDemoAccess(formData.get('password'));
  if (!ok) {
    // flatten timing differences between a near miss and a wild guess
    await new Promise((r) => setTimeout(r, 400));
    return { error: 'That password is not right.' };
  }
  redirect(safeNext(formData.get('next')));
}

export async function lockPrivateDemos() {
  await revokePrivateDemoAccess();
  redirect('/demos/private');
}
