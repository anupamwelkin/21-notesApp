console.log("console added");
let noteTitle = document.getElementById("noteTitle");
let noteDesc = document.getElementById("noteDesc");
let noteCard = document.getElementById("noteCard");
let modalDiv = document.getElementById("modalDiv");

let notesArr = [];

function validate() {
  if (noteTitle.value == "") {
    alert("Title can't be null");
    return false;
  }
  if (noteDesc.value == "") {
    alert("Description can't be null");
    return false;
  }
}
function submitFn() {
  saveLocalData();
}
function saveLocalData() {
  let strArr = { Title: noteTitle.value, Description: noteDesc.value };
  notesArr.push(strArr);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  populateData();
  noteTitle.value = "";
  noteDesc.value = "";
}
function populateData() {
  if (
    JSON.parse(localStorage.getItem("notes")) === null ||
    JSON.parse(localStorage.getItem("notes")).length === 0
  ) {
    let str = "";
    str += `<p style="text-align:center; font-size:23px" class="my-3">Add Some Notes</p>`;
    noteCard.innerHTML = str;
  } else {
    let html = "";

    let data = JSON.parse(localStorage.getItem("notes"));
    data.forEach((item, index) => {
      html += ` 
  <div class="card mx-3 my-3" style="width: 18rem" >
   <div class="card-body">
                <h3 style="display:none">${index + 1}</h3>
                <h5 class="card-title">${item.Title}</h5>
                <p class="card-text">${item.Description}</p>
                <div class="btnContainer d-flex flex-row justify-content-between">
                 
                <button href="#" id=${index} class="btn btn-primary" id="myBtn" onclick="editFn(this)" >Edit</button>
                    <button href="#" id=${index} class="btn btn-danger" onclick="deleteFn(this.id)">Delete</button>
                 </div>
             </div>
             </div>`;
    });
    noteCard.innerHTML = html;
  }
}

function editFn(e) {
  openModal();

  let editSno =
    e.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerHTML;

  let editTitle =
    e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  let editDescription = e.parentElement.previousElementSibling.innerHTML;
  // console.log(editTitle, editDescription);
  let modalStr = "";
  let data = JSON.parse(localStorage.getItem("notes"));
  modalStr += `
   <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <label><b> Title : </b>
      <input type = "text" id="edInpTitle" class="form-control" /></label><br>
      <label> <b> Description : </b>
      <input type = "text" id="edInpTextarea" class="form-control" /></label> <br>
      <button id=${
        editSno - 1
      } onclick="insertUpdate(this.id);"  class="btn btn-primary" >Update</button>
    </div>
  `;
  modalDiv.innerHTML = modalStr;
  document.getElementById("edInpTitle").value = editTitle;
  document.getElementById("edInpTextarea").value = editDescription;
}
function insertUpdate(e) {
  let dataTitle = document.getElementById("edInpTitle").value;
  let dataDesc = document.getElementById("edInpTextarea").value;
  let updateData = { Title: dataTitle, Description: dataDesc };
  let editData = localStorage.getItem("notes");
  let parseEditData = JSON.parse(editData);
  parseEditData.splice(e, 1);
  parseEditData.push(updateData);
  localStorage.setItem("notes", JSON.stringify(parseEditData));
  populateData();
  closeModal();
}
function deleteFn(index) {
  let notesArr = localStorage.getItem("notes");
  let data = JSON.parse(notesArr);
  data.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(data));
  populateData();
}
window.addEventListener("DOMContentLoaded", () => {
  populateData();
});

function closeModal() {
  modalDiv.style.display = "none";
}
function openModal() {
  modalDiv.style.display = "block";
}

//search logic
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log(inputVal);
  // // console.log('Input event fired!', inputVal);
  let card = document.getElementsByClassName("card");
  // console.log(card);

  Array.from(card).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let cardHead = element.getElementsByTagName("h5")[0].innerText;
    // console.log(cardTxt);

    if (cardTxt.includes(inputVal) || cardHead.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    //   // console.log(cardTxt);
  });
});
