import { cookies } from 'next/headers';

/**
 * Password gate for the private demo collection.
 *
 * The password lives only in the server env (`PRIVATE_DEMOS_PASSWORD`). The cookie holds an
 * HMAC of a fixed label keyed by the password, so changing the password signs everyone out.
 * With no password configured the collection stays locked.
 */

export const PRIVATE_DEMOS_COOKIE = 'private_demos';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function configuredPassword() {
  const pw = process.env.PRIVATE_DEMOS_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

export function isPrivateDemosConfigured() {
  return configuredPassword() !== null;
}

async function sign(password) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode('private-demos-v1'));
  return Buffer.from(mac).toString('hex');
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function hasPrivateDemoAccess() {
  const pw = configuredPassword();
  if (!pw) return false;
  const jar = await cookies();
  const token = jar.get(PRIVATE_DEMOS_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, await sign(pw));
}

/** @returns {Promise<boolean>} true when the password matched and the cookie was set */
export async function grantPrivateDemoAccess(attempt) {
  const pw = configuredPassword();
  if (!pw || typeof attempt !== 'string') return false;
  const [expected, given] = await Promise.all([sign(pw), sign(attempt)]);
  if (!safeEqual(given, expected)) return false;
  const jar = await cookies();
  jar.set(PRIVATE_DEMOS_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/demos/private',
    maxAge: COOKIE_MAX_AGE,
  });
  return true;
}

export async function revokePrivateDemoAccess() {
  const jar = await cookies();
  jar.delete({ name: PRIVATE_DEMOS_COOKIE, path: '/demos/private' });
}
