"use strict";

window.addEventListener("load", sidenLoades);

function sidenLoades() {
  console.log("tjek om lortet virker");
}

const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

const completedItemsArray = [];
//const completedItemsArray = localStorage.getItem("completedItems") ? JSON.parse(localStorage.getItem("completedItems")) : [];
console.log("hej hej hej", itemsArray);
// console.log(completedItemsArray);

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
  item.value = "";
});

function createItem(itemText) {
  const newItem = { text: itemText.value, completed: false };
  itemsArray.push(newItem);
  //   localStorage.setItem("items", JSON.stringify(itemsArray));
  //localStorage.setItem("items", JSON.stringify([itemsArray, "completedItemsArray"]));
  saveToLocalStorage();
  location.reload();
}

// function createItem(itemText) {
//   const newItem = { text: itemText.value, completed: false }; // Opret et objekt med tekst og status
//   itemsArray.push(newItem);
//   localStorage.setItem("items", JSON.stringify(itemsArray));
//   location.reload();
// }

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
  <div class="input-controller">
    <textarea disabled>${itemsArray[i]}</textarea>
    <div class="edit-controller">
      <i class="fa-solid fa-check checkBtn"></i>
      <i class="fa-solid fa-pen-to-square editBtn"></i>
      <i class="fa-solid fa-trash deleteBtn"></i>
    </div>
  </div>
  <div class="update-controller">
    <button class="saveBtn">SAVE</button>
    <button class="cancelBtn">CANCEL</button>
  </div>
  </div>`;
  }
  for (let i = 0; i < completedItemsArray.length; i++) {
    items += `<div class="item completed">
      <div class="input-controller">
        <textarea disabled>${completedItemsArray[i]}</textarea>
        <div class="edit-controller">
          <i class="fa-solid fa-check checkBtn"></i>
          <i class="fa-solid fa-pen-to-square editBtn"></i>
          <i class="fa-solid fa-trash deleteBtn"></i>
        </div>
        <div class="update-controller">
              <button class="saveBtn">SAVE</button>
            <button class="cancelBtn">CANCEL</button>
         </div>
      </div>
    </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateCheckListeners();
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

// function moveItemToCompleted(i) {
//   const completedList = document.querySelector(".completed-list");
//   const itemToMove = document.querySelectorAll(".item")[i]; // Find det tilsvarende opgaveelement
//   completedList.appendChild(itemToMove); // Flyt opgaven til "Completed List"

//   // Opdater opgavens status til 'completed'
//   itemsArray[i].completed = true;

//   // Opdater localStorage
//   localStorage.setItem("items", JSON.stringify(itemsArray));
// }

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  //   localStorage.setItem("items", JSON.stringify([itemsArray, "completedItemsArray"]));
  saveToLocalStorage();
  //   localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItems(inputs[i].value, i);
    });
  });
}

function updateItems(text, i) {
  itemsArray[i] = text;
  //   localStorage.setItem("items", JSON.stringify(itemsArray));
  //   localStorage.setItem("items", JSON.stringify([itemsArray, "completedItemsArray"]));
  saveToLocalStorage();
  location.reload();
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

function createItem(item) {
  itemsArray.push(item.value);
  //   localStorage.setItem("items", JSON.stringify(itemsArray));
  //localStorage.setItem("items", JSON.stringify([itemsArray, "completedItemsArray"]));
  saveToLocalStorage();
  location.reload();
}

function activateCheckListeners() {
  const checkBtn = document.querySelectorAll(".checkBtn");
  checkBtn.forEach((cb, i) => {
    cb.addEventListener("click", moveItemToCompleted);
  });
}

function moveItemToCompleted(evt) {
  console.log("evt", evt.target.parentElement.parentElement.parentElement);
  //   console.log(evt.currentTarget);
  const itemToMove = evt.target.parentElement.parentElement.parentElement;
  const completedList = document.querySelector(".completed-list");
  //   const itemToMove = document.querySelectorAll(".item")[i];
  console.log("itemToMove.value", itemToMove.querySelector(".input-controller textarea").textContent);
  completedItemsArray.push(itemToMove.querySelector(".input-controller textarea").value);
  //   console.log(itemToMove);

  const itemToMoveString = itemToMove.querySelector(".input-controller textarea").textContent;

  console.log(
    "findNewItem",
    itemsArray.findIndex((elm) => elm === itemToMoveString)
  );
  const indexOfItemToDelete = itemsArray.findIndex((elm) => elm === itemToMoveString);
  itemsArray.splice(indexOfItemToDelete, 1);

  completedList.appendChild(itemToMove);
  // Opdater opgavens status til 'completed'
  //localStorage.setItem("items", JSON.stringify(itemsArray));

  //   localStorage.setItem("items", JSON.stringify(itemsArray));
  saveToLocalStorage();
  //   itemsArray[i].completed = true;
  console.log("completedItemsArray", completedItemsArray);
  console.log("itemsArray", itemsArray);
}

function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(itemsArray));
  console.log(itemsArray);
  localStorage.setItem("completedItems", JSON.stringify(completedItemsArray));
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  console.log(date);
  document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
  displayItems();
};
