const express = require("express");
const router = express.Router();
const moodController = require("../controllers/moodController");

/**
 * RESTful Route Design:
 * GET    /moods       → Get all mood entries
 * POST   /moods       → Create a new mood entry
 * GET    /moods/:id   → Get a specific mood entry
 * PUT    /moods/:id   → Update a specific mood entry
 * DELETE /moods/:id   → Delete a specific mood entry
 */

// Collection routes
router.get("/", moodController.getMoods);
router.post("/", moodController.addMood);

// Single resource routes
router.get("/:id", moodController.getMoodById);
router.put("/:id", moodController.updateMood);
router.delete("/:id", moodController.deleteMood);

module.exports = router;
