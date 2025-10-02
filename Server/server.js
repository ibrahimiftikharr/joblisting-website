const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // <-- ADD THIS

const authenticateToken = require('./middleware/authenticateToken');
const authRoutes = require('./routes/authRoutes');
const employerRoutes = require('./routes/employerRoutes');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');

const app = express();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://nooriftikhar000_db_user:E69S9RvU96vgDp44@cluster0.5zvg7iu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas successfully"))
.catch((err) => console.log("Cannot connect to MongoDB Atlas:", err));


// API Routes
app.use('/auth', authRoutes);
app.use('/employer', authenticateToken, employerRoutes);
app.use('/jobseeker', authenticateToken, jobSeekerRoutes);

// ------------------------------
// ✅ Serve React Frontend Build
// ------------------------------
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// ------------------------------

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
