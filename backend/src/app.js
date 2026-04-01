import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1313;

app.use(cors());
app.use(express.json());

app.use('/api', analyzeRoutes);

app.get('/', (req, res) => {
   console.log("Health⚡️");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
