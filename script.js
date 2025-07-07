// Notizen im Browser anzeigen lassen

let notes = [
  "Gurke",
  "Zwiebeln",
  "Pfanne",
  "Chips",
  "Tampons",
  "Zwirn",
  "Schnürsenkel",
  "Mehl",
  "Kartoffeln",
  "Pflaster",
];

let trashNotes = [];

function renderNotes() {
  let contentRef = document.getElementById("content1");

  contentRef.innerText = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function getNoteTemplate(indexNote) {
  return /*html*/ `<div class="firstNoteContainer"><p>${notes[indexNote]}</p><button onclick="checkNote(${indexNote})" class="deleteButton">&#x2714;</button></div>`;
}

function addNote() {
  let noteInputRef = document.getElementById("noteInputBox");
  let noteInput = noteInputRef.value;

  if (!isNaN(noteInput) && noteInput !== " ") {
    overlayIfNotAString();
  } else {
    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
  }
}

function overlayIfNotAString() {
  let notAString = document.getElementById("inputAndAddNoteButton");
  notAString.innerHTML = /*html*/ `<input
        id="noteInputBox"
        type="text"
        placeholder="Was brauchen wir noch"
      />
      <button onclick="addNote()">Notiz hinzufügen</button><p>Ein richtiges Wort bitte</p>`;
}

function checkNote(indexNote) {
  let trashNote = notes.splice(indexNote, 1);

  trashNotes.push(trashNote);

  renderNotes();
  renderTrashNotes();
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trashContent");

  trashContentRef.innerText = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}
function getTrashNoteTemplate(indexTrashNote) {
  return /*html*/ `<div class="trashNoteContainer"><p>${trashNotes[indexTrashNote]}</p><button onclick="deleteFinallyNote(${indexTrashNote})" class="deleteFinallyButton">&#x2718;</button></div>`;
}

function deleteFinallyNote(indexTrashNote) {
  let trashNote = trashNotes.splice(indexTrashNote, 1);

  trashNotes.slice(trashNote, 1);

  renderTrashNotes();
}
