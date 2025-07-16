// === server.js ===
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Added to parse form submissions

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Use contact form API
app.use('/api/contact', contactRoutes);

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));