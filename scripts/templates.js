function getNoteTemplate(indexNote) {
  return /*html*/ `
      <div 
        class="notesContainer"><p>${amounts[indexNote]} x ${notes[indexNote]}</p>
        <button onclick="checkNote(${indexNote})" class="deleteButton">&#x2714;</button>
      </div>`;
}

function textIfCorrect() {
  let correctValidation = document.getElementById("inputAndAddNoteButton");
  correctValidation.innerHTML = /*html*/ `
      <input id="noteInputBox" type="text" maxlength="30"
        placeholder="Ich brauche..."
        />
        <input class="amountInputBox" id="amountInputBox" type="number" max="50" placeholder="Menge"
        />
        <button onclick="addNoteAndAmount()">dazu"
      </button>`;
}

function getArchiveNoteTemplate(indexArchiveNote) {
  return /*html*/ `
      <div class="archiveNoteContainer">
        <p>${archiveAmounts[indexArchiveNote]} x ${archiveNotes[indexArchiveNote]}
        </p>
        <div class="getBackAndToTrashButton"><button onclick="getNoteBack(${indexArchiveNote})" class="getNoteBackButton">&#x21BA;
        </button>
        <button  class="archiveItButton" onclick="noteAndAmountToTrash(${indexArchiveNote})">&#x2718;
        </button>
        </div>
      </div>`;
}

function getTrashDeletedTemplate(indexTrashNote) {
  return /*html*/ `
      <div class="trashNoteContainer">
        <p>${trashAmounts[indexTrashNote]} x ${trashNotes[indexTrashNote]}
        </p>
        <button onclick="deleteTrashNotesAndAmount(${indexTrashNote})" class="deleteItButton">&#x2718;
        </button>
      </div>`;
}
