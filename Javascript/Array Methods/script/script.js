// =======================
// Mood Logger with JSON + Local Storage + Array Methods
// =======================

// DOM Elements
const moodForm = document.querySelector("#moodForm");
const moodInput = document.querySelector("#mood");
const notesInput = document.querySelector("#notes");
const moodList = document.querySelector("#moodList");

// Load moods from Local Storage or start with empty array
let moods = JSON.parse(localStorage.getItem("moods")) || [];

// Render moods using .map()
function renderMoods() {
    moodList.innerHTML = moods.map(entry => {
        return `
            <tr>
                <td>${entry.date}</td>
                <td>${entry.mood}</td>
                <td>${entry.notes || "—"}</td>
                <td>
                    <button class="delete-btn" data-id="${entry.id}">❌</button>
                </td>
            </tr>
        `;
    }).join("");
}

// Save moods to Local Storage
function saveMoods() {
    localStorage.setItem("moods", JSON.stringify(moods));
}

// Handle form submit
moodForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const moodValue = moodInput.value.trim();
    const notesValue = notesInput.value.trim();

    if (moodValue) {
        const moodEntry = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            mood: moodValue,
            notes: notesValue || "—"
        };

        // push()
        moods.push(moodEntry);

        saveMoods();
        renderMoods();

        moodInput.value = "";
        notesInput.value = "";
    } else {
        alert("Please enter your mood before submitting!");
    }
});

// Delete button using filter()
moodList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const idToDelete = Number(event.target.getAttribute("data-id"));
        moods = moods.filter(entry => entry.id !== idToDelete);
        saveMoods();
        renderMoods();
    }
});

// Initial render
renderMoods();
