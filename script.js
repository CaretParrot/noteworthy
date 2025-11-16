let notes = [
    { placeholder: "Start typing here!", value: ""}
];

window.onload = () => {
    updateNotes();
}

function updateNotes() {
    // @ts-ignore
    document.getElementById("notes").innerHTML = "";
    for (let i = 0; i < notes.length; i++) {
        let newNote = document.createElement("input");
        newNote.placeholder = notes[i].placeholder;
        newNote.value = notes[i].value;
        newNote.onkeydown = (event) => {
            notes[i].value = newNote.value;
            if (event.key === "Enter") {
                addNote();
            }
        }
        document.getElementById("notes")?.appendChild(newNote);
        newNote.focus();
    }
}

function addNote() {
    notes.push({ placeholder: "Start typing here!", value: "" });
    updateNotes();
}