import { Router } from 'express';
import { authenticate, AuthRequest } from '../../middleware/auth';
import { listUsers, createUser, updateUser, removeUser } from './users.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();

router.use(authenticate);

router.get('/', (req: AuthRequest, res, next) => {
  const tenantId = req.user!.tenantId;
  listUsers(tenantId).then((users) => res.json(users)).catch(next);
});

router.post('/', (req, res, next) => {
  createUser(req.body).then((user) => res.status(201).json(user)).catch(next);
});

router.patch('/:id', (req, res, next) => {
  updateUser(req.params.id, req.body).then((user) => res.json(user)).catch(next);
});

router.delete('/:id', (req, res, next) => {
  removeUser(req.params.id).then(() => res.status(204).send()).catch(next);
});

router.use(errorHandler);

export default router;
