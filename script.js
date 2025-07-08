// Notizen im Browser anzeigen lassen

let notes = ["Kaffee", "Würstchen", "Apfel", "Chips", "Tastatur", "Mango"];

let amounts = ["1", "6", "2", "1", "1", "2"];
let archiveNotes = [];
let archiveAmounts = [];
let trashNotes = [];
let trashAmounts = [];

// Notizen rendern (Array)
function renderNotes() {
  let contentRef = document.getElementById("content1");
  contentRef.innerHTML = "";
  // "notes" weiß nun, wie es aufgebaut ist
  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}
// Mit dem "Werkzeug" indexNote öffnet ("return") beim entsprechenden Befehl
function getNoteTemplate(indexNote) {
  return /*html*/ `<div class="firstNoteContainer"><p>${amounts[indexNote]} x ${notes[indexNote]}</p><button onclick="checkNote(${indexNote})" class="deleteButton">&#x2714;</button></div>`;
}
// Notiz und Menge hinzufügen
function addNoteAndAmount() {
  let noteInputRef = document.getElementById("noteInputBox");
  let noteInput = noteInputRef.value;

  let noteAmountRef = document.getElementById("amountInputBox");
  let noteAmount = noteAmountRef.value;
  // Falls kein Input oder keine Menge oder Menge ist keine Number...
  if (!noteInput || noteAmount < 1 || isNaN(noteAmount)) {
    // ... werden die Inputboxen geleert und leer dargestellt
    textIfCorrect();
    return;
  }
  // Falls if nicht zutrifft, also alles gut, werden die Inputwerte verarbeitet und ausgegeben
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

// Das Produkt soll aus indexNote ins archiveNote
// Die Menge soll aus indexAmount ins archiveAmount
function checkNote(indexNote) {
  // Nur jeweils ein Teil der Arrays
  let archiveNote = notes.splice(indexNote, 1);
  let archiveAmount = amounts.splice(indexNote, 1);
  // Von
  archiveNotes.push(archiveNote);
  archiveAmounts.push(archiveAmount);
  renderNotes();
  // soll aktiviert werden
  renderArchiveNotes();
}
// indexArchive wird aufgerufen
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
// So soll das Archiv aussehen, wenn es aktiviert wurde
function getArchiveNoteTemplate(indexArchiveNote) {
  return /*html*/ `<div class="archiveNoteContainer"><button onclick="getNoteBack(${indexArchiveNote})" class="getNoteBackButton">&#x21BA;</button>
  <p>${archiveAmounts[indexArchiveNote]} x ${archiveNotes[indexArchiveNote]}</p>
  
  <button
    onclick="noteAndAmountToTrash(${indexArchiveNote})"
    class="archiveItButton"
  >
    &#x2718;
  </button>
</div>`;
}
// Notizen und Mengen sollen ins Archiv übergeben werden
function noteAndAmountToArchive(indexArchiveNote) {
  archiveNotes.splice(indexArchiveNote, 1);
  archiveAmounts.splice(indexArchiveNote, 1);
  renderArchiveNotes();
}
// Archivierte Notizen und Mengen sollen zurückgeholt werden
function getNoteBack(indexArchiveNote) {
  notes.push(archiveNotes.splice(indexArchiveNote, 1)[0]);
  amounts.push(archiveAmounts.splice(indexArchiveNote, 1)[0]);
  renderNotes();
  renderArchiveNotes();
}

///////////////////////////////////////////////////////////////////////////////

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trashContent");
  trashContentRef.innerText = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML = getTrashDeletedTemplate(indexTrashNote);
  }
}
// Elemente sollen gelöscht werden
// Vorher aus dem Array gesplicet
function noteAndAmountToTrash(indexToTrash) {
  trashNotes.push(archiveNotes.splice(indexToTrash, 1)[0]);
  trashAmounts.push(archiveAmounts.splice(indexToTrash, 1)[0]);
  renderArchiveNotes();
  renderTrashNotes();
}

function getTrashDeletedTemplate(indexTrashNote) {
  return /*html*/ `<div class="trashNoteContainer">
  <p>${trashAmounts[indexTrashNote]} x ${trashNotes[indexTrashNote]}</p>
  
  <button
    onclick="noteAndAmountToTrash(${indexTrashNote})"
    class="deleteItButton"
  >
    &#x2718;
  </button>
</div>`;
}
