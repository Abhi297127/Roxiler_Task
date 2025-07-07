require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');



const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/store-owner', require('./routes/storeOwnerRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // or authRoutes

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));