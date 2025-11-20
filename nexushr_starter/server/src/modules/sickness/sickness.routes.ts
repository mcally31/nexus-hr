import { Router } from 'express';
import { authenticate, AuthRequest } from '../../middleware/auth';
import { logSickness, listSickness } from './sickness.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.post('/', (req: AuthRequest, res, next) => {
  logSickness(req.user!.id, req.body).then((report) => res.status(201).json(report)).catch(next);
});

router.get('/', (req: AuthRequest, res, next) => {
  listSickness(req.user!.tenantId).then((data) => res.json(data)).catch(next);
});

router.use(errorHandler);

export default router;
