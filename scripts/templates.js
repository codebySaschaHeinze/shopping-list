function getNoteTemplate(indexNote) {
  return /*html*/ `
      <div 
        class="notesContainer"><p>${allNotes.amounts[indexNote]} x ${allNotes.notes[indexNote]}</p>
         <button onclick="moveNotesToArchive(${indexNote}, 'notes', 'amounts', 'archiveNotes', 'archiveAmounts')" class="deleteButton">&#x2714;
         </button>
      </div>`;
}

function getArchiveNoteTemplate(indexArchiveNote) {
  return /*html*/ `
      <div class="archiveNoteContainer">
        <p>${allNotes.archiveAmounts[indexArchiveNote]} x ${allNotes.archiveNotes[indexArchiveNote]}
        </p>
        <div class="getBackAndToTrashButton"><button onclick="moveArchiveBackToNotes(${indexArchiveNote}, 'archiveNotes', 'archiveAmounts', 'notes', 'amounts')" class="getNoteBackButton">&#x21BA;
        </button>
        <button onclick="moveArchiveToTrash(${indexArchiveNote}, 'archiveNotes', 'archiveAmounts', 'trashNotes', 'trashAmounts')" class="archiveItButton">&#x2718;
        </button>
        </div>
      </div>`;
}
function getTrashDeletedTemplate(indexTrashNote) {
  return /*html*/ `
      <div class="trashNoteContainer">
        <p>${allNotes.trashAmounts[indexTrashNote]} x ${allNotes.trashNotes[indexTrashNote]}
        </p>
        <button onclick="deleteTrashNotesAndAmount(${indexTrashNote}, 'trashNotes', 'trashAmounts')" class="deleteItButton">&#x2718;
        </button>
      </div>`;
}

function textIfCorrect() {
  let correctValidation = document.getElementById("input-an-add-note-button");
  correctValidation.innerHTML = /*html*/ `
      <input id="note-input-box" type="text" maxlength="30"
        placeholder="Ich brauche..."
        />
        <input class="amount-input-box" id="amount-input-box" type="number" max="50" placeholder="Menge"
        />
        <button onclick="addNoteAndAmount()">dazu"
      </button>`;
}
