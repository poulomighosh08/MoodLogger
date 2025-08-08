const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const moodRoutes = require("./routes/moodRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // allow frontend requests
app.use(bodyParser.json());

// Routes
app.use("/api/moods", moodRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
