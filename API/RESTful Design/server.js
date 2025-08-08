const express = require("express");
const cors = require("cors");
const moodRoutes = require("./routes/moodRoutes");

const app = express();
const PORT = 5000;

// Middleware for JSON
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// Handle invalid JSON body gracefully
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    next();
});

// RESTful Routes
app.use("/api/moods", moodRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}/api/moods`);
});
