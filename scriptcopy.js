let myData = ["Banane", "Apfel", "Zitrone"];

function init() {
  getFromLocalStorage();
  render();
}

// Bei onload() -> init()

function loadNotes() {
  notes = JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveData() {
  let inputRef = document.getElementById("dataInput");

  if (inputRef.value != "") {
    myData.push(inputRef.value);
  }

  saveToLocalStorage();

  render();
  inputRef.value = "";
}

function saveToLocalStorage() {
  localStorage.setItem("myData", JSON.stringify(myData));
}

function getFromLocalStorage() {
  let myArr = JSON.parse(localStorage.getItem("myData"));
  if (myArr === null) {
    myData = [];
  } else {
    myData = myArr;
  }
}

function render() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let index = 0; index < myData.length; index++) {
    contentRef.innerHTML += `<p>${myData[index]}</p>`;
  }
}
