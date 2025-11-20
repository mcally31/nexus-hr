import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { getSettings, updateSettings } from './settings.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.get('/', (_req, res, next) => {
  getSettings().then((settings) => res.json(settings)).catch(next);
});

router.patch('/', (req, res, next) => {
  updateSettings(req.body).then((result) => res.json(result)).catch(next);
});

router.use(errorHandler);

export default router;
