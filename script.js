
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
    }
    document.getElementById("notes")?.appendChild(newLine);
    newLine.focus();
}

/**
 * 
 * @param {Element} element 
 */
function deleteNote(element) {
    element.remove();
    notesElement?.children[notesElement?.children.length - 1].focus();
}