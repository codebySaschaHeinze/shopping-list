// Notizen im Browser anzeigen lassen

let notes = ["Kaffee", "Würstchen", "Apfel", "Chips", "Tastatur", "Mango"];

let amounts = ["1", "6", "2", "1", "1", "2"];
let archiveNotes = [];
let archiveAmounts = [];

// Notizen rendern (Liste)
function renderNotes() {
  localStorage.setItem("myDog", "Klaus-Peter");
  getFromLocalStorage();
  let contentRef = document.getElementById("content1");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function getNoteTemplate(indexNote) {
  return /*html*/ `<div class="firstNoteContainer"><p>${amounts[indexNote]} x ${notes[indexNote]}</p><button onclick="checkNote(${indexNote})" class="deleteButton">&#x2714;</button></div>`;
}
// Notiz und Menge hinzufügen
function addNoteAndAmount() {
  let noteInputRef = document.getElementById("noteInputBox");
  let noteInput = noteInputRef.value;

  let noteAmountRef = document.getElementById("amountInputBox");
  let noteAmount = noteAmountRef.value;

  if (!noteInput || noteAmount < 1 || isNaN(noteAmount)) {
    textIfCorrect();
    return;
  }
  notes.push(noteInput);
  amounts.push(noteAmount);
  renderNotes();
  noteInputRef.value = "";
  noteAmountRef.value = "";
}

// Validierung ob korrekte Eingabe
function textIfCorrect() {
  let correctValidation = document.getElementById("inputAndAddNoteButton");
  correctValidation.innerHTML = /*html*/ `<input
        id="noteInputBox"
        type="text"
        
        placeholder="Ich brauche..."
      />
      <input
        class="amountInputBox"
        id="amountInputBox"
        type="number"
        max="50"
        
        placeholder="Menge"
      />
      <button onclick="addNoteAndAmount()">dazu</button>`;
}

function checkNote(indexNote) {
  let archiveNote = notes.splice(indexNote, 1);
  let archiveAmount = amounts.splice(indexNote, 1);

  archiveNotes.push(archiveNote);
  archiveAmounts.push(archiveAmount);
  renderNotes();
  renderArchiveNotes();
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archiveContent");

  archiveContentRef.innerText = "";

  for (
    let indexArchiveNote = 0;
    indexArchiveNote < archiveNotes.length;
    indexArchiveNote++
  ) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
  }
}
function getArchiveNoteTemplate(indexArchiveNote) {
  return /*html*/ `<div class="archiveNoteContainer"><button onclick="getNoteBack(${indexArchiveNote})" class="getNoteBackButton">&#x21BA;</button>
  <p>${archiveAmounts[indexArchiveNote]} x ${archiveNotes[indexArchiveNote]}</p>
  
  <button
    onclick="deleteFinallyNote(${indexArchiveNote})"
    class="deleteFinallyButton"
  >
    &#x2718;
  </button>
</div>`;
}

function deleteFinallyNote(indexArchiveNote) {
  archiveNotes.splice(indexArchiveNote, 1);
  archiveAmounts.splice(indexArchiveNote, 1);
  renderArchiveNotes();
}

function getNoteBack(indexArchiveNote) {
  notes.push(archiveNotes.splice(indexArchiveNote, 1)[0]);
  amounts.push(archiveAmounts.splice(indexArchiveNote, 1)[0]);
  renderNotes();
  renderArchiveNotes();
}
