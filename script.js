let allNotes = {
  notes: [],
  amounts: [],
  archiveNotes: [],
  archiveAmounts: [],
  trashNotes: [],
  trashAmounts: [],
};

//

// moveNote(1, "trashNotes", "archiveNotes");

// function moveNote(indexNote, startKey, destinationKey) {
//   let archivedNoteToTrash = allNotes[startKey].splice(indexToTrash, 1);
//   allNotes[destinationKey].push(archivedNoteToTrash[0]);

//   let archivedAmountToTrash = allNotes[startKey].splice(indexToTrash, 1);
//   allNotes[destinationKey].push(archivedAmountToTrash[0]);

//   saveAllToLocalStorage();
//   renderNotes();
//   renderArchiveNotes();
//   renderTrashNotes();
// }

// function noteAndAmountToTrash(indexToTrash) {
//   let archivedNoteToTrash = allNotes.archiveNotes.splice(indexToTrash, 1);
//   allNotes.trashNotes.push(archivedNoteToTrash);
//   let archivedAmountToTrash = allNotes.archiveAmounts.splice(indexToTrash, 1);
//   allNotes.trashAmounts.push(archivedAmountToTrash);

//   saveAllToLocalStorage();
//   renderNotes();
//   renderArchiveNotes();
//   renderTrashNotes();
// }

//

function init() {
  getAllFromLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}

function saveAllToLocalStorage() {
  localStorage.setItem("allNotes", JSON.stringify(allNotes));
}

function getAllFromLocalStorage() {
  let myNotes = JSON.parse(localStorage.getItem("allNotes"));
  if (myNotes === null) {
    saveAllToLocalStorage();
  } else {
    allNotes = myNotes;
  }
}

function renderNotes() {
  let contentRef = document.getElementById("notes-content");
  contentRef.innerHTML = "";
  for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archive-content");
  archiveContentRef.innerHTML = "";

  for (
    let indexArchiveNote = 0;
    indexArchiveNote < allNotes.archiveNotes.length;
    indexArchiveNote++
  ) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash-content");
  trashContentRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < allNotes.trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashDeletedTemplate(indexTrashNote);
  }
}
// von Input zu Notizfeld
function addNoteAndAmount() {
  let noteInputRef = document.getElementById("note-input-box");
  let noteInput = noteInputRef.value;
  let noteAmountRef = document.getElementById("amount-input-box");
  let noteAmount = noteAmountRef.value;
  clearWarning();

  if (!noteInput || noteAmount < 1 || isNaN(noteAmount)) {
    warningIfInputNotCorrect();
    return;
  }

  allNotes.notes.push(noteInput);
  allNotes.amounts.push(noteAmount);
  saveAllToLocalStorage();
  renderNotes();
  noteInputRef.value = "";
  noteAmountRef.value = "";
}

function warningIfInputNotCorrect() {
  let warningRef = document.getElementById("warning-text");
  warningRef.innerHTML = "Bitte beide Felder ausfüllen";
}

function clearWarning() {
  let warningRef = document.getElementById("warning-text");
  warningRef.innerHTML = "";
}
// Von Notizfeld zu Archivfeld
function noteAndAmountToArchive(indexNote) {
  let noteToArchive = allNotes.notes.splice(indexNote, 1)[0];
  allNotes.archiveNotes.push(noteToArchive);
  let amountToArchive = allNotes.amounts.splice(indexNote, 1)[0];
  allNotes.archiveAmounts.push(amountToArchive);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}

// Von Archivfeld zurück zum Notizfeld
function getNoteBack(indexArchiveNote) {
  let note = allNotes.archiveNotes.splice(indexArchiveNote, 1)[0];
  allNotes.notes.push(note);
  let amount = allNotes.archiveAmounts.splice(indexArchiveNote, 1)[0];
  allNotes.amounts.push(amount);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}

// von Archivfeld zu Papierkorbfeld
function noteAndAmountToTrash(indexToTrash) {
  let noteToTrash = allNotes.archiveNotes.splice(indexToTrash, 1)[0];
  allNotes.trashNotes.push(noteToTrash);
  let amountToTrash = allNotes.archiveAmounts.splice(indexToTrash, 1)[0];
  allNotes.trashAmounts.push(amountToTrash);
  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}
// Papierkorb leeren
function deleteTrashNotesAndAmount(indexTrashNote) {
  allNotes.trashNotes.splice(indexTrashNote, 1);
  allNotes.trashAmounts.splice(indexTrashNote, 1);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}
