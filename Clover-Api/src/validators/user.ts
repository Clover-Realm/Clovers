import { z } from 'zod';

/**
 * Schema for creating a user. Enforces email format, a constrained username,
 * and a password policy (length + character-class requirements). `safeParse`
 * is used in the route handler so validation failures return 400 with the
 * exact field-level issues.
 */
export const createUserSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('A valid email address is required'),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username may only contain letters, numbers, and underscores',
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
});




export type CreateUserInput = z.infer<typeof createUserSchema>;
