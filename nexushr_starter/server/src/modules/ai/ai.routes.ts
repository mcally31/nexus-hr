import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { queryAI } from './ai.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.post('/query', (req, res, next) => {
  const { message, contextType } = req.body;
  queryAI(message, contextType).then((response) => res.json(response)).catch(next);
});

router.use(errorHandler);

export default router;
