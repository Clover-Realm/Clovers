import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const KEY_LENGTH = 64;

/** Hash a plaintext password with a random salt (scrypt, built-in crypto). */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return { hash, salt };
}

/** Constant-time verification of a plaintext password against a stored hash. */
export function verifyPassword(
  password: string,
  hash: string,
  salt: string,
): boolean {
  const candidate = scryptSync(password, salt, KEY_LENGTH);
  const stored = Buffer.from(hash, 'hex');
  return (
    stored.length === candidate.length &&
    timingSafeEqual(stored, candidate)
  );
}
