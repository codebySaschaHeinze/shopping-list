let allNotes = {
  notes: [],
  amounts: [],
  archiveNotes: [],
  archiveAmounts: [],
  trashNotes: [],
  trashAmounts: [],
};

function init() {
  getAllFromLocalStorage();
  renderAll();
}

function moveNotesToArchive(
  indexNote,
  startKeyNotes,
  startKeyAmounts,
  destinationKeyArchiveNotes,
  destinationKeyArchiveAmounts
) {
  let noteToArchive = allNotes[startKeyNotes].splice(indexNote, 1);
  allNotes[destinationKeyArchiveNotes].push(noteToArchive[0]);
  let amountToArchive = allNotes[startKeyAmounts].splice(indexNote, 1);
  allNotes[destinationKeyArchiveAmounts].push(amountToArchive[0]);
  saveAllToLocalStorage();
  renderAll();
}

function moveArchiveToTrash(
  indexArchiveNote,
  startKeyArchiveNotes,
  startKeyArchiveAmounts,
  destinationKeyTrashNotes,
  destinationKeyTrashAmounts
) {
  let noteToTrash = allNotes[startKeyArchiveNotes].splice(indexArchiveNote, 1);
  allNotes[destinationKeyTrashNotes].push(noteToTrash[0]);
  let amountToTrash = allNotes[startKeyArchiveAmounts].splice(
    indexArchiveNote,
    1
  );
  allNotes[destinationKeyTrashAmounts].push(amountToTrash[0]);
  saveAllToLocalStorage();
  renderAll();
}

function moveArchiveBackToNotes(
  indexArchiveNote,
  startKeyArchiveNotes,
  startKeyArchiveAmounts,
  destinationKeyNotes,
  destinationKeyAmounts
) {
  let noteToRestore = allNotes[startKeyArchiveNotes].splice(
    indexArchiveNote,
    1
  );
  allNotes[destinationKeyNotes].push(noteToRestore[0]);
  let amountToRestore = allNotes[startKeyArchiveAmounts].splice(
    indexArchiveNote,
    1
  );
  allNotes[destinationKeyAmounts].push(amountToRestore[0]);
  saveAllToLocalStorage();
  renderAll();
}

function deleteTrashNotesAndAmount(
  indexTrashNote,
  startKeyTrashNotes,
  startKeyTrashAmounts
) {
  allNotes[startKeyTrashNotes].splice(indexTrashNote, 1);
  allNotes[startKeyTrashAmounts].splice(indexTrashNote, 1);
  saveAllToLocalStorage();
  renderAll();
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
  renderAll();
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

function deleteTrashNotesAndAmount(indexTrashNote) {
  allNotes.trashNotes.splice(indexTrashNote, 1);
  allNotes.trashAmounts.splice(indexTrashNote, 1);
  saveAllToLocalStorage();
  renderAll();
}

function renderAll() {
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}
