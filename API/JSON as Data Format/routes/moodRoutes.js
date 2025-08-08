const express = require("express");
const router = express.Router();
const {
    getMoods,
    addMood,
    updateMood,
    deleteMood
} = require("../controllers/moodController");

// HTTP Methods
router.get("/", getMoods);       // GET all moods
router.post("/", addMood);       // POST new mood
router.put("/:id", updateMood);  // PUT update mood
router.delete("/:id", deleteMood); // DELETE mood

module.exports = router;
