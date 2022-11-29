// ========================================
// ----------------- localStorage ------------------

const ref = {
  addItemsForm: document.querySelector(".js-add-items-form"),
  itemsList: document.querySelector(".js-item-list"),
}
const { addItemsForm, itemsList } = ref;

// const items = []; // без использование localStorage
const items = JSON.parse(localStorage.getItem("items")) || [];  // взять значения из localStorage
console.log(items);


function addItem(event) {
  event.preventDefault(); // предотвратить поведение формы по умолчанию

  const text = event.target.item.value;
  const item = {
    text: text,
    checked: false,
  }
  items.push(item);
  // console.log(item);
  // console.log(items);

  localStorage.setItem("items", JSON.stringify(items)); // записать значения в localStorage

  displayItems(items, itemsList);
  this.reset() // перезагружать форму после каждого добавления элемента (this - это event.target)
};


function displayItems(items, itemsList) {
  // console.log(items, itemsList);
  itemsList.innerHTML = items.map((item, index) => {
    return `
    <li>
      <input type="checkbox" id="item${index}" data-index="${index}" ${item.checked ? "checked" : "" } />
      ${index + 1}         
      <label for="item${index}">${item.text}</label>
    </li>`;
  }).join("");
};


function toggleClick(event) {
  // console.log(event);
  // console.log(event.target);
  // console.log(event.target.checked);
  if (!event.target.matches("input")) {
    return;
  };
  // console.log(event.target.dataset.index);
  const element = event.target.dataset.index; 
  items[element].checked = !items[element].checked; // поменять значение на противоположное
  
  localStorage.setItem("items", JSON.stringify(items)); // записать значения в localStorage

  displayItems(items, itemsList);
};


addItemsForm.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleClick);
displayItems(items, itemsList); // для отображения списка после перезагрузки страницы

