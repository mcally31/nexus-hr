import { Router } from 'express';
import { handleLogin, handleRegister, handleMe } from './auth.controller';
import { authenticate } from '../../middleware/auth';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();

router.post('/register', (req, res, next) => handleRegister(req, res).catch(next));
router.post('/login', (req, res, next) => handleLogin(req, res).catch(next));
router.get('/me', authenticate, (req, res, next) => handleMe(req, res).catch(next));

router.use(errorHandler);

export default router;
