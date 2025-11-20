import { Router } from 'express';
import { authenticate, AuthRequest } from '../../middleware/auth';
import { searchEmployees } from './directory.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.get('/', (req: AuthRequest, res, next) => {
  const query = (req.query.q as string) || '';
  searchEmployees(req.user!.tenantId, query).then((results) => res.json(results)).catch(next);
});

router.use(errorHandler);

export default router;
