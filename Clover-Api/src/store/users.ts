import { randomUUID } from 'crypto';
import type { CreateUserInput } from '../validators/user';
import { hashPassword } from '../lib/password';

/** User shape returned to clients — never includes credential material. */
export interface PublicUser {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

interface StoredUser extends PublicUser {
  passwordHash: string;
  salt: string;
}

export type CreateUserResult = { user: PublicUser } | { error: string };

// In-memory store. Swap for a real database client later — the function
// signatures here are the contract the routes depend on.
const users: StoredUser[] = [];

function toPublic(user: StoredUser): PublicUser {
  const { passwordHash, salt, ...publicUser } = user;
  return publicUser;
}

export function createUser(input: CreateUserInput): CreateUserResult {
  const email = input.email.toLowerCase();
  const username = input.username;

  if (users.some((u) => u.email === email)) {
    return { error: 'Email is already registered' };
  }
  if (users.some((u) => u.username === username)) {
    return { error: 'Username is already taken' };
  }

  const { hash, salt } = hashPassword(input.password);
  const user: StoredUser = {
    id: randomUUID(),
    email,
    username,
    createdAt: new Date().toISOString(),
    passwordHash: hash,
    salt,
  };
  users.push(user);

  return { user: toPublic(user) };
}

export function listUsers(): PublicUser[] {
  return users.map(toPublic);
}
