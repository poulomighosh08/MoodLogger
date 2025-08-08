// =======================
// Mood Logger - Full Stack (API version)
// =======================

const API_URL = "http://localhost:5000/api/moods";

const moodForm = document.querySelector("#moodForm");
const moodInput = document.querySelector("#mood");
const notesInput = document.querySelector("#notes");
const moodList = document.querySelector("#moodList");

let editMode = false;
let editId = null;

// =======================
// Fetch & Display All Moods
// =======================
async function fetchMoods() {
    try {
        const res = await fetch(API_URL);
        const moods = await res.json();
        displayMoods(moods);
    } catch (error) {
        console.error("❌ Error fetching moods:", error);
    }
}

function displayMoods(moods) {
    moodList.innerHTML = "";
    moods.forEach(mood => {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        dateCell.textContent = mood.date;

        const moodCell = document.createElement("td");
        moodCell.textContent = mood.mood;

        const notesCell = document.createElement("td");
        notesCell.textContent = mood.notes || "—";

        // Action buttons
        const actionsCell = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "5px";
        editBtn.addEventListener("click", () => startEdit(mood));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteMood(mood.id));

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(dateCell);
        row.appendChild(moodCell);
        row.appendChild(notesCell);
        row.appendChild(actionsCell);

        moodList.appendChild(row);
    });
}

// =======================
// Add or Update Mood
// =======================
async function saveMood(moodValue, notesValue) {
    const moodData = {
        mood: moodValue,
        notes: notesValue,
        date: new Date().toISOString().split("T")[0]
    };

    try {
        if (editMode && editId) {
            // PUT - Update
            const res = await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(moodData)
            });
            if (!res.ok) throw new Error("Failed to update mood");
            editMode = false;
            editId = null;
        } else {
            // POST - Create
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(moodData)
            });
            if (!res.ok) throw new Error("Failed to add mood");
        }

        fetchMoods();
    } catch (error) {
        console.error("❌ Error saving mood:", error);
    }
}

// =======================
// Start Edit Mode
// =======================
function startEdit(mood) {
    moodInput.value = mood.mood;
    notesInput.value = mood.notes;
    editMode = true;
    editId = mood.id;
}

// =======================
// Delete Mood
// =======================
async function deleteMood(id) {
    if (!confirm("Are you sure you want to delete this mood?")) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete mood");
        fetchMoods();
    } catch (error) {
        console.error("❌ Error deleting mood:", error);
    }
}

// =======================
// Handle Form Submission
// =======================
moodForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const moodValue = moodInput.value.trim();
    const notesValue = notesInput.value.trim();

    if (moodValue !== "") {
        saveMood(moodValue, notesValue);
        moodInput.value = "";
        notesInput.value = "";
    } else {
        alert("Please enter your mood before submitting!");
    }
});

// =======================
// Initial Load
// =======================
fetchMoods();
