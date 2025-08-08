// =======================
// Mood Logger - Part 3 JS
// =======================

// Select form and table body from DOM
const moodForm = document.querySelector("#moodForm");
const moodInput = document.querySelector("#mood"); 
const notesInput = document.querySelector("#notes");
const moodList = document.querySelector("#moodList");

// Handle form submission
moodForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page refresh

    const moodValue = moodInput.value.trim();
    const notesValue = notesInput.value.trim();

    if (moodValue !== "") {
        // Create a new table row
        const row = document.createElement("tr");

        // Date cell
        const dateCell = document.createElement("td");
        dateCell.textContent = new Date().toISOString().split("T")[0];

        // Mood cell
        const moodCell = document.createElement("td");
        moodCell.textContent = moodValue;

        // Notes cell
        const notesCell = document.createElement("td");
        notesCell.textContent = notesValue || "—";

        // Append cells to row
        row.appendChild(dateCell);
        row.appendChild(moodCell);
        row.appendChild(notesCell);

        // Append row to table body
        moodList.appendChild(row);

        // Clear inputs
        moodInput.value = "";
        notesInput.value = "";
    } else {
        alert("Please enter your mood before submitting!");
    }
});
