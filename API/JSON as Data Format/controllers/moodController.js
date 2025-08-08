const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data.json");

// Helper to read data
function readData() {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

// Helper to save data
function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
}

// GET all moods
function getMoods(req, res) {
    const moods = readData();
    res.json(moods);
}

// POST new mood
function addMood(req, res) {
    const { mood, notes } = req.body;

    if (!mood) {
        return res.status(400).json({ message: "Mood is required" });
    }

    const moods = readData();
    const newMood = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        mood,
        notes: notes || "—"
    };

    moods.push(newMood);
    saveData(moods);

    res.status(201).json(newMood);
}

// PUT update mood
function updateMood(req, res) {
    const { id } = req.params;
    const { mood, notes } = req.body;

    let moods = readData();
    const index = moods.findIndex(entry => entry.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ message: "Mood not found" });
    }

    moods[index] = {
        ...moods[index],
        mood: mood || moods[index].mood,
        notes: notes || moods[index].notes
    };

    saveData(moods);
    res.json(moods[index]);
}

// DELETE mood
function deleteMood(req, res) {
    const { id } = req.params;
    let moods = readData();
    const filteredMoods = moods.filter(entry => entry.id !== Number(id));

    if (filteredMoods.length === moods.length) {
        return res.status(404).json({ message: "Mood not found" });
    }

    saveData(filteredMoods);
    res.json({ message: "Mood deleted" });
}

module.exports = {
    getMoods,
    addMood,
    updateMood,
    deleteMood
};
