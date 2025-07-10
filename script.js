let allNotes = {
  notes: [],
  amounts: [],
  archiveNotes: [],
  archiveAmounts: [],
  trashNotes: [],
  trashAmounts: [],
};

// function moveNote(indexNote, startKey, destinationKey) {
//   let noteToTrash = allNotes.archiveNotes.splice(indexToTrash, 1)[0];
//   allNotes.trashNotes.push(noteToTrash);

//   let amountToTrash = allNotes.archiveAmounts.splice(indexToTrash, 1)[0];
//   allNotes.trashAmounts.push(amountToTrash);

//   saveAllToLocalStorage();
//   renderArchiveNotes();
//   renderTrashNotes();

// }

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
    allNotes = [];
  } else {
    allNotes = myNotes;
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

  function renderNotes() {
    let contentRef = document.getElementById("notes-content");
    contentRef.innerHTML = "";
    for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
      contentRef.innerHTML += getNoteTemplate(indexNote);
    }
  }

  function warningIfInputNotCorrect() {
    let warningRef = document.getElementById("warning-text");
    warningRef.innerHTML = "Bitte beide Felder ausfüllen";
  }

  function clearWarning() {
    let warningRef = document.getElementById("warning-text");
    warningRef.innerHTML = "";
  }

  allNotes.notes.push(noteInput);
  allNotes.amounts.push(noteAmount);
  saveAllToLocalStorage();
  renderNotes();
  noteInputRef.value = "";
  noteAmountRef.value = "";
}

function checkNote(indexNote) {
  let archiveNote = allNotes.notes.splice(indexNote, 1)[0];
  allNotes.archiveNotes.push(archiveNote);
  let archiveAmount = allNotes.amounts.splice(indexNote, 1)[0];
  allNotes.archiveAmounts.push(archiveAmount);
  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
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

function deleteTrashNotesAndAmount(indexTrashNote) {
  allNotes.trashNotes.splice(indexTrashNote, 1);
  allNotes.trashAmounts.splice(indexTrashNote, 1);

  saveAllToLocalStorage();
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}
