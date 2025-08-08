// =======================
// Mood Logger with JSON + Local Storage
// =======================

// Select form and table body from DOM
const moodForm = document.querySelector("#moodForm");
const moodInput = document.querySelector("#mood"); 
const notesInput = document.querySelector("#notes");
const moodList = document.querySelector("#moodList");

// Load saved moods from Local Storage (JSON -> JS Array)
let moods = JSON.parse(localStorage.getItem("moods")) || [];

// Function to render moods in table
function renderMoods() {
    moodList.innerHTML = ""; // Clear table body first
    moods.forEach(entry => {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        dateCell.textContent = entry.date;

        const moodCell = document.createElement("td");
        moodCell.textContent = entry.mood;

        const notesCell = document.createElement("td");
        notesCell.textContent = entry.notes || "—";

        row.appendChild(dateCell);
        row.appendChild(moodCell);
        row.appendChild(notesCell);

        moodList.appendChild(row);
    });
}

// Handle form submission
moodForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page refresh

    const moodValue = moodInput.value.trim();
    const notesValue = notesInput.value.trim();

    if (moodValue !== "") {
        // Create mood object
        const moodEntry = {
            date: new Date().toISOString().split("T")[0],
            mood: moodValue,
            notes: notesValue || "—"
        };

        // Add to moods array
        moods.push(moodEntry);

        // Save to Local Storage (Array -> JSON)
        localStorage.setItem("moods", JSON.stringify(moods));

        // Re-render table
        renderMoods();

        // Clear inputs
        moodInput.value = "";
        notesInput.value = "";
    } else {
        alert("Please enter your mood before submitting!");
    }
});

// Initial render on page load
renderMoods();
