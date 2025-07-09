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

function saveTrashAmountsToLocalStorage() {
  localStorage.setItem("trashAmounts", JSON.stringify(trashAmounts));
}

function renderNotes() {
  let contentRef = document.getElementById("notesContent");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

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
  saveNotesToLocalStorage();
  saveAmountsToLocalStorage();
  renderNotes();
  noteInputRef.value = "";
  noteAmountRef.value = "";
}

function checkNote(indexNote) {
  let archiveNote = notes.splice(indexNote, 1)[0];
  let archiveAmount = amounts.splice(indexNote, 1)[0];

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

function noteAndAmountToArchive(indexArchiveNote) {
  archiveNotes.splice(indexArchiveNote, 1)[0];
  archiveAmounts.splice(indexArchiveNote, 1)[0];
  saveArchiveNotesToLocalStorage();
  saveArchiveAmountsToLocalStorage();
  renderArchiveNotes();
}

function getNoteBack(indexArchiveNote) {
  notes.push(archiveNotes.splice(indexArchiveNote, 1)[0]);
  amounts.push(archiveAmounts.splice(indexArchiveNote, 1)[0]);
  saveArchiveNotesToLocalStorage();
  saveArchiveAmountsToLocalStorage();
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

function noteAndAmountToTrash(indexToTrash) {
  trashNotes.push(archiveNotes.splice(indexToTrash, 1)[0]);
  trashAmounts.push(archiveAmounts.splice(indexToTrash, 1)[0]);
  renderArchiveNotes();
  renderTrashNotes();
}

function deleteTrashNotesAndAmount(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  trashAmounts.splice(indexTrashNote, 1);
  renderArchiveNotes();
  renderTrashNotes();

  saveArchiveNotesToLocalStorage();
  saveArchiveAmountsToLocalStorage();
  saveTrashNotesToLocalStorage();
  saveTrashAmountsToLocalStorage();
  renderTrashNotes();
}
