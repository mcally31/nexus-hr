import { Router } from 'express';
import { authenticate, AuthRequest } from '../../middleware/auth';
import { createExpense, listExpenses } from './expenses.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.post('/', (req: AuthRequest, res, next) => {
  createExpense(req.user!.id, req.user?.department || undefined, req.body)
    .then((expense) => res.status(201).json(expense))
    .catch(next);
});

router.get('/', (req: AuthRequest, res, next) => {
  const { userId } = req.query;
  listExpenses(req.user!.tenantId, userId as string | undefined).then((data) => res.json(data)).catch(next);
});

router.use(errorHandler);

export default router;
