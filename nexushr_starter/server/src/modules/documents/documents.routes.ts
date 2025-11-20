import { Router } from 'express';
import { authenticate, AuthRequest } from '../../middleware/auth';
import { uploadDocument, listDocuments } from './documents.service';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.post('/', (req: AuthRequest, res, next) => {
  uploadDocument(req.user!.tenantId, req.body).then((doc) => res.status(201).json(doc)).catch(next);
});

router.get('/', (req: AuthRequest, res, next) => {
  listDocuments(req.user!.tenantId).then((docs) => res.json(docs)).catch(next);
});

router.use(errorHandler);

export default router;
