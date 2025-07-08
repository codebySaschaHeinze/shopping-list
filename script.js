// Notizen im Browser anzeigen lassen

let notes = ["Kaffee", "Würstchen", "Apfel", "Chips", "Tastatur", "Mango"];

let amounts = ["1", "6", "2", "1", "1", "2"];
let trashNotes = [];
let trashAmounts = [];

// Notizen rendern (Liste)
function renderNotes() {
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
  let trashNote = notes.splice(indexNote, 1);
  let trashAmount = amounts.splice(indexNote, 1);

  trashNotes.push(trashNote);
  trashAmounts.push(trashAmount);
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
  return /*html*/ `<div class="trashNoteContainer"><button onclick="getNoteBack(${indexTrashNote})" class="getNoteBackButton">&#x21BA;</button>
  <p>${trashAmounts[indexTrashNote]} x ${trashNotes[indexTrashNote]}</p>
  
  <button
    onclick="deleteFinallyNote(${indexTrashNote})"
    class="deleteFinallyButton"
  >
    &#x2718;
  </button>
</div>`;
}

function deleteFinallyNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  trashAmounts.splice(indexTrashNote, 1);
  renderTrashNotes();
}

function getNoteBack(indexTrashNote) {
  notes.push(trashNotes.splice(indexTrashNote, 1)[0]);
  amounts.push(trashAmounts.splice(indexTrashNote, 1)[0]);
  renderNotes();
  renderTrashNotes();
}
