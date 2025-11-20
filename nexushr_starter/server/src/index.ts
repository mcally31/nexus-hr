import dotenv from 'dotenv';
import app from './app';
import { env } from './config/env';

dotenv.config();

const port = env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
