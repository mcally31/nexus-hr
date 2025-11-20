import { Router } from 'express';
import { authenticate, AuthRequest } from '../../middleware/auth';
import { createLeave, listLeave, approveLeave, declineLeave } from './leave.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.post('/', (req: AuthRequest, res, next) => {
  createLeave(req.user!.id, req.body).then((request) => res.status(201).json(request)).catch(next);
});

router.get('/', (req: AuthRequest, res, next) => {
  const { userId } = req.query;
  listLeave(req.user!.tenantId, userId as string | undefined).then((data) => res.json(data)).catch(next);
});

router.patch('/:id/approve', (req, res, next) => {
  approveLeave(req.params.id).then((request) => res.json(request)).catch(next);
});

router.patch('/:id/decline', (req, res, next) => {
  declineLeave(req.params.id).then((request) => res.json(request)).catch(next);
});

router.use(errorHandler);

export default router;
