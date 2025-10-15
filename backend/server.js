require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const agentRoutes = require('./routes/agent.routes');
app.use('/api/agents', agentRoutes);

const uploadRoutes = require('./routes/upload.routes');
app.use('/api/upload', uploadRoutes);

const runRoutes = require('./routes/run.routes');
app.use('/api/runs', runRoutes);


const { errorHandler } = require('./middlewares/error.middleware');
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'MERN Distributor backend up' });
});

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
