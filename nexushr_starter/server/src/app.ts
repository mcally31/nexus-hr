import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import leaveRoutes from './modules/leave/leave.routes';
import sicknessRoutes from './modules/sickness/sickness.routes';
import expenseRoutes from './modules/expenses/expenses.routes';
import documentRoutes from './modules/documents/documents.routes';
import directoryRoutes from './modules/directory/directory.routes';
import aiRoutes from './modules/ai/ai.routes';
import settingsRoutes from './modules/settings/settings.routes';

const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/sickness', sicknessRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/settings', settingsRoutes);

app.use(errorHandler);

export default app;
