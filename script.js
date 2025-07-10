// Arrays für die Listen (je 2, weil 2 Werte pro liste)
let notes = [];
let amounts = [];
let archiveNotes = [];
let archiveAmounts = [];
let trashNotes = [];
let trashAmounts = [];

// Beim onload passiert all das
function init() {
  getNotesFromLocalStorage();
  getAmountsFromLocalStorage();
  getArchiveNotesFromLocalStorage();
  getArchiveAmountsFromLocalStorage();
  getTrashNotesFromLocalStorage();
  getTrashAmountsFromLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}

// Alle Arrays werden im Local Storage gespeichert
function saveAllToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("amounts", JSON.stringify(amounts));
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  localStorage.setItem("archiveAmounts", JSON.stringify(archiveAmounts));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashAmounts", JSON.stringify(trashAmounts));
}

// Arrays werden vom Local Storage geladen (Funktionsaufruf bei Init())
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
// Funktion um "getNoteTemplate"-Template anzuzeigen
function renderNotes() {
  // Holt sich Element aus html und speichert es in "contentRef"...
  let contentRef = document.getElementById("notesContent");
  // leert danach "notesContent"
  contentRef.innerHTML = "";
  // geht alle Notizen durch
  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    // und gibt sie im "getNoteTemplate"-Template aus
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

// Informationen aus den Inputboxen
function addNoteAndAmount() {
  let noteInputRef = document.getElementById("noteInputBox");
  let noteInput = noteInputRef.value;

  let noteAmountRef = document.getElementById("amountInputBox");
  let noteAmount = noteAmountRef.value;
  clearWarning();

  // Validierung, welche Eingaben die Inputboxen nicht! annehmen dürfen
  if (!noteInput || noteAmount < 1 || isNaN(noteAmount)) {
    warningIfInputNotCorrect();
    return;
  }
  // Warnung falls Bedingung von oben nicht erfüllt
  function warningIfInputNotCorrect() {
    let warningRef = document.getElementById("warningText");
    warningRef.innerHTML = "Bitte beide Felder ausfüllen";
  }
  // Leer falls Bedingung von oben erüllt wurde
  function clearWarning() {
    let warningRef = document.getElementById("warningText");
    warningRef.innerHTML = "";
  }

  notes.push(noteInput);
  amounts.push(noteAmount);
  saveAllToLocalStorage();
  renderNotes();
  noteInputRef.value = "";
  noteAmountRef.value = "";
}

function checkNote(indexNote) {
  let archiveNote = notes.splice(indexNote, 1)[0];
  archiveNotes.push(archiveNote);

  let archiveAmount = amounts.splice(indexNote, 1)[0];
  archiveAmounts.push(archiveAmount);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archiveContent");
  archiveContentRef.innerHTML = "";

  for (
    let indexArchiveNote = 0;
    indexArchiveNote < archiveNotes.length;
    indexArchiveNote++
  ) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
  }
}

function noteAndAmountToArchive(indexArchiveNote) {
  archiveNotes.splice(indexArchiveNote, 1)[0];
  archiveAmounts.splice(indexArchiveNote, 1)[0];

  saveAllToLocalStorage();
  renderArchiveNotes();
}

function getNoteBack(indexArchiveNote) {
  let note = archiveNotes.splice(indexArchiveNote, 1)[0];
  notes.push(note);

  let amount = archiveAmounts.splice(indexArchiveNote, 1)[0];
  amounts.push(amount);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trashContent");
  trashContentRef.innerHTML = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashDeletedTemplate(indexTrashNote);
  }
}

function noteAndAmountToTrash(indexToTrash) {
  let noteToTrash = archiveNotes.splice(indexToTrash, 1)[0];
  trashNotes.push(noteToTrash);

  let amountToTrash = archiveAmounts.splice(indexToTrash, 1)[0];
  trashAmounts.push(amountToTrash);

  saveAllToLocalStorage();
  renderArchiveNotes();
  renderTrashNotes();
}

function deleteTrashNotesAndAmount(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);

  trashAmounts.splice(indexTrashNote, 1);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}
