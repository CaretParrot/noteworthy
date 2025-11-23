/**
 * @type {*}
 */
let notesElement = document.getElementById("notes");
let control = false;
let shift = false;

window.onload = () => {
    if (notesElement === null) {
        window.close();
    }

    if (notesElement?.innerHTML === "") {
        addNote();
    }
}

function addNote() {
    let newLine = document.createElement("span");
    newLine.contentEditable = "true";
    newLine.innerHTML = ``;
    newLine.dataset.indent = "0";

    newLine.onkeydown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addNote();
        }

        if (event.key === "Backspace") {
            if (control && notesElement.children.length > 1) {
                event.preventDefault();
                deleteNote(newLine);
            }

            if ((newLine.innerHTML === "<br>" || newLine.innerHTML === "") && notesElement.children.length > 1) {
                event.preventDefault();
                deleteNote(newLine);
            }
        }

        if (event.key === "Control") {
            control = true;
        }

        if (event.key === "Shift") {
            shift = true;
        }

        if (event.key === "Tab") {
            event.preventDefault();
            newLine.innerHTML += "&nbsp&nbsp&nbsp&nbsp";
            newLine.innerHTML.replace("<br>", "");
        }

        if (event.key === "ArrowDown") {
            if (control) {
                let text = "";
                for (let i = 0; i < notesElement.querySelectorAll("*").length; i++) {
                    text += notesElement.querySelectorAll("*")[i].innerHTML + "\n";
                }
                
                let blob = new Blob([text], { type: "text/plain" });
                let download = document.createElement("a");
                download.href = URL.createObjectURL(blob);
                download.download = "notes.txt";
                download.click();
                download.remove();
            }
        }


        if (newLine.innerHTML.startsWith("@ ")) {
            newLine.style.backgroundColor = "var(--def)";
        } else if (newLine.innerHTML.startsWith("! ")) {
            newLine.style.backgroundColor = "var(--important)";
        } else if (newLine.innerHTML.startsWith("# ")) {
            newLine.style.backgroundColor = "var(--heading)";
        } else {
            newLine.style.backgroundColor = "var(--accent)";
        }
    }

    /**
     * 
     * @param {*} event 
     */
    newLine.onkeyup = (event) => {
        if (event.key === "Control") {
            shift = false;
        }

        if (event.key === "Shift") {
            shift = false;
        }
    }

    newLine.innerHTML.replace("<br>", "");
    notesElement.appendChild(newLine);
    newLine.focus();
}

/**
 * 
 * @param {HTMLSpanElement} element 
 */
function deleteNote(element) {
    element.remove();
    let lastElement = notesElement?.children[notesElement?.children.length - 1];
    lastElement.focus();
}