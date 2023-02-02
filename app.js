console.log("console added");
let noteTitle = document.getElementById("noteTitle");
let noteDesc = document.getElementById("noteDesc");
let noteCard = document.getElementById("noteCard");
let modalDiv = document.getElementById("modalDiv");

let notesArr = [];

if (sessionStorage.getItem("Title") === null) {
  let str = "";
  str += `<p style="text-align:center; font-size:23px" class="my-3">Nothing to show</p>`;
  noteCard.innerHTML = str;
}

function submitFn() {
  saveLocalData();
}
function saveLocalData() {
  let strArr = { Title: noteTitle.value, Description: noteDesc.value };
  notesArr.push(strArr);
  // notesArr.forEach((element, index, array) => {
  sessionStorage.setItem("notes", JSON.stringify(notesArr));
  // });
  populateData();
}
function populateData() {
  let html = "";

  let data = JSON.parse(sessionStorage.getItem("notes"));
  data.map((item) => {
    html += ` 
  <div class="card mx-3 my-3" style="width: 18rem" >
   <div class="card-body">
                <h5 class="card-title">${item.Title}</h5>
                <p class="card-text">${item.Description}</p>
                <div class="btnContainer d-flex flex-row justify-content-between">
                 
                <button href="#" class="btn btn-primary" id="myBtn" onclick="editFn(this)" >Edit</button>
                    <button href="#" class="btn btn-danger">Delete</button>
                 </div>
             </div>
             </div>`;
  });
  noteCard.innerHTML = html;
}

function editFn() {
  console.log("running modal");
  // let modalStr = "";
  // let data = JSON.parse(sessionStorage.getItem("notes"));
  // data.map((item) => {
  //   modalStr += ` //   <div class="modal-content">
  //     <span class="close">&times;</span>
  //     <p>Title: </p>
  //     <input type = "text" class="form-control" value=${this.value}>
  //   </div>

  // `;
  // });
  // modalDiv.innerHTML = modalStr;
  // alert();
}
