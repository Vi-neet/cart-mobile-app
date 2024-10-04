import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-43556-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListinDb = ref(database, "shoppingList");

const addBtn = document.getElementById("add-btn");
const inputEl = document.getElementById("input-field");
const ulEl = document.getElementById("shopping-list");

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;

  push(shoppingListinDb, inputValue);

  clearField();
});

onValue(shoppingListinDb, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      // let currentItemID = currentItem[0];
      // let currentItemValue = currentItem[1];

      addListEl(currentItem);
    }
  } else {
    ulEl.innerHTML = "No items here... yet";
  }
});

function clearShoppingListEl() {
  ulEl.innerHTML = "";
}

function clearField() {
  inputEl.value = "";
}

function addListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationInDB);
  });

  ulEl.append(newEl);
}
