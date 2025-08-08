const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to Neon PostgreSQL
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_qTvkmG4IDC7l@ep-fragrant-water-aele2ccz-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    ssl: { rejectUnauthorized: false } // Needed for cloud DBs
});

// ✅ Create table if not exists
(async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS moods (
            id SERIAL PRIMARY KEY,
            date TEXT NOT NULL,
            mood TEXT NOT NULL,
            notes TEXT
        )
    `);
})();

// REST API Routes
app.get("/api/moods", async (req, res) => {
    const result = await pool.query("SELECT * FROM moods ORDER BY id DESC");
    res.json(result.rows);
});

app.post("/api/moods", async (req, res) => {
    const { date, mood, notes } = req.body;
    const result = await pool.query(
        "INSERT INTO moods (date, mood, notes) VALUES ($1, $2, $3) RETURNING *",
        [date, mood, notes]
    );
    res.status(201).json(result.rows[0]);
});

app.put("/api/moods/:id", async (req, res) => {
    const { id } = req.params;
    const { date, mood, notes } = req.body;
    const result = await pool.query(
        "UPDATE moods SET date=$1, mood=$2, notes=$3 WHERE id=$4 RETURNING *",
        [date, mood, notes, id]
    );
    res.json(result.rows[0]);
});

app.delete("/api/moods/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM moods WHERE id=$1", [id]);
    res.json({ message: "Mood deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
