// Notizen im Browser anzeigen lassen

let notes = [];
let amounts = [];
let archiveNotes = [];
let archiveAmounts = [];
let trashNotes = [];
let trashAmounts = [];

function init() {
  getNotesFromLocalStorage();
  getAmountsFromLocalStorage();
  getArchiveNotesFromLocalStorage();
  getArchiveAmountsFromLocalStorage();
  getTrashNotesFromLocalStorage();
  getTrashAmountsFromLocalStorage();
}

function getNotesFromLocalStorage() {
  let myNotes = JSON.parse(localStorage.getItem("notes"));
  if (myNotes === null) {
    notes = [];
  } else {
    notes = myNotes;
  }
}

function getAmountsFromLocalStorage() {
  let myAmounts = JSON.parse(localStorage.getItem("amounts"));
  if (myAmounts === null) {
    amounts = [];
  } else {
    amounts = myAmounts;
  }
}

function getArchiveNotesFromLocalStorage() {
  let myArchiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));
  if (myArchiveNotes === null) {
    archiveNotes = [];
  } else {
    archiveNotes = myArchiveNotes;
  }
}

function getArchiveAmountsFromLocalStorage() {
  let myArchiveAmounts = JSON.parse(localStorage.getItem("archiveAmounts"));
  if (myArchiveAmounts === null) {
    archiveAmounts = [];
  } else {
    archiveAmounts = myArchiveAmounts;
  }
}

function getTrashNotesFromLocalStorage() {
  let myTrashNotes = JSON.parse(localStorage.getItem("trashNotes"));
  if (myTrashNotes === null) {
    trashNotes = [];
  } else {
    trashNotes = myTrashNotes;
  }
}

function getTrashAmountsFromLocalStorage() {
  let myTrashAmounts = JSON.parse(localStorage.getItem("trashAmounts"));
  if (myTrashAmounts === null) {
    trashAmounts = [];
  } else {
    trashAmounts = myTrashAmounts;
  }
}

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function saveAmountsToLocalStorage() {
  localStorage.setItem("amounts", JSON.stringify(amounts));
}

function saveArchiveNotesToLocalStorage() {
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
}

function saveArchiveAmountsToLocalStorage() {
  localStorage.setItem("archiveAmounts", JSON.stringify(archiveAmounts));
}

function saveTrashNotesToLocalStorage() {
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function saveArchiveAmountsToLocalStorage() {
  localStorage.setItem("trashAmounts", JSON.stringify(trashAmounts));
}

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
  return /*html*/ `<div class="NotesContainer"><p>${amounts[indexNote]} x ${notes[indexNote]}</p><button onclick="checkNote(${indexNote})" class="deleteButton">&#x2714;</button></div>`;
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
  saveNotesToLocalStorage();
  saveAmountsToLocalStorage();
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
  saveArchiveNotesToLocalStorage();
  saveArchiveAmountsToLocalStorage();
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

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trashContent");
  trashContentRef.innerText = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashDeletedTemplate(indexTrashNote);
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
    onclick="deleteTrashNotesAndAmount(${indexTrashNote})"
    class="deleteItButton"
  >
    &#x2718;
  </button>
</div>`;
}

function deleteTrashNotesAndAmount(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  trashAmounts.splice(indexTrashNote, 1);

  saveNotesToLocalStorage();
  saveAmountsToLocalStorage();
  saveArchiveNotesToLocalStorage();
  saveArchiveAmountsToLocalStorage();
  saveTrashNotesToLocalStorage();
  saveArchiveAmountsToLocalStorage();
  renderTrashNotes();
}
