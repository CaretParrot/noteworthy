/**
 * @type {HTMLElement | null}
 */
let notesElement = document.getElementById("notes");

window.onload = () => {
    if (notesElement === null) {
        window.close();
    }

    if (notesElement?.innerHTML === "") {
        addNote();
    }
}

function addNote() {
    let newLine = document.createElement("input");
    newLine.contentEditable = "true";
    newLine.placeholder = "...";

    newLine.onkeydown = (event) => {
        if (event.key === "Enter") {
            addNote();
        }

        if (event.key === "Backspace" && newLine.value === "" && notesElement !== null && notesElement.children.length > 1) {
            event.preventDefault();
            deleteNote(newLine);
        }


        if (newLine.value.startsWith("@ ")) {
            newLine.style.backgroundColor = "var(--def)";
        } else if (newLine.value.startsWith("! ")) {
            newLine.style.backgroundColor = "var(--important)";
        } else {
            newLine.style.backgroundColor = "var(--accent)";
        }
    }
    document.getElementById("notes")?.appendChild(newLine);
    newLine.focus();
}

/**
 * 
 * @param {HTMLInputElement} element 
 */
function deleteNote(element) {
    element.remove();
    //@ts-ignore
    notesElement?.children[notesElement?.children.length - 1].focus();
}