// =======================
// Mood Logger - Part 3 JS + Local Storage
// =======================

// Select form and table body from DOM
const moodForm = document.querySelector("#moodForm");
const moodInput = document.querySelector("#mood"); 
const notesInput = document.querySelector("#notes");
const moodList = document.querySelector("#moodList");

// Load existing moods from Local Storage on page load
document.addEventListener("DOMContentLoaded", loadMoodsFromStorage);

// Handle form submission
moodForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page refresh

    const moodValue = moodInput.value.trim();
    const notesValue = notesInput.value.trim();

    if (moodValue !== "") {
        const moodEntry = {
            date: new Date().toISOString().split("T")[0],
            mood: moodValue,
            notes: notesValue || "—"
        };

        // Add to table
        addMoodToTable(moodEntry);

        // Save to Local Storage
        saveMoodToStorage(moodEntry);

        // Clear inputs
        moodInput.value = "";
        notesInput.value = "";
    } else {
        alert("Please enter your mood before submitting!");
    }
});

// Function to add a mood entry row to the table
function addMoodToTable(entry) {
    const row = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = entry.date;

    const moodCell = document.createElement("td");
    moodCell.textContent = entry.mood;

    const notesCell = document.createElement("td");
    notesCell.textContent = entry.notes;

    row.appendChild(dateCell);
    row.appendChild(moodCell);
    row.appendChild(notesCell);

    moodList.appendChild(row);
}

// Function to save a mood entry in Local Storage
function saveMoodToStorage(entry) {
    let moods = JSON.parse(localStorage.getItem("moodLogs")) || [];
    moods.push(entry);
    localStorage.setItem("moodLogs", JSON.stringify(moods));
}

// Function to load all saved moods from Local Storage
function loadMoodsFromStorage() {
    let moods = JSON.parse(localStorage.getItem("moodLogs")) || [];
    moods.forEach(addMoodToTable);
}
