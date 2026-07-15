import { Router, type Request, type Response } from 'express';
import { createUserSchema } from '../validators/user';
import { createUser, listUsers } from '../store/users';

export const usersRouter = Router();

/** List all users (credentials excluded). */
usersRouter.get('/', (_req: Request, res: Response) => {
  res.json({ users: listUsers() });
});





/**
 * Create a user.
 * Validates the request body with zod; on failure returns 400 with
 * field-level issues. Domain conflicts (duplicate email/username) return 409.
 */
usersRouter.post('/', (req: Request, res: Response) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const result = createUser(parsed.data);
  if ('error' in result) {
    return res.status(409).json({ error: result.error });
  }

  return res.status(201).json({ user: result.user });
});
