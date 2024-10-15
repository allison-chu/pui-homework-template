//array of objects for glazing 
const glazing = [
  {glaze: "Keep Original", price: 0},
  {glaze: "Sugar Milk", price: 0},
  {glaze: "Vanilla Milk", price: 0.50},
  {glaze: "Double Chocolate", price: 1.50}
];

//pack sizes 
const packSizes = [1, 3, 6, 12];

class Roll {
    constructor(rollType, rollGlazing, packSize, glazingPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.glazingPrice = glazingPrice;
    }
}

//loading cart from localstorage or empty array 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const rollInfo = rolls[rollType]; //setting rollInfo to a specifc roll depending on the url set in gallery
const rollTitle = document.querySelector('#top-text'); //setting the title for the speciic roll
const rollImage = document.querySelector('#product-image-detail'); //setting the image for the specific roll
rollTitle.textContent = rollType + " Cinnamon Roll"; //setting the roll text to the specific cinnamon roll
rollImage.src = "../assets/products/" + rollInfo.imageFile; //setting the image to the specific roll
const rollBasePrice  = rollInfo.basePrice; //setting each roll's base price to the new base prices 

//for in loop to populate the glazing in the drop downs
function populateGlaze() {
  const glazingSelect = document.getElementById('glazing');
  for (let optionData of glazing) {
    const option = document.createElement('option');
    option.value = optionData.price; 
    option.textContent = optionData.glaze; 
    glazingSelect.appendChild(option); 
  }
}

//for in loop to populate the pack sizes in the drop down 
function populatePackSizeOptions() {
  const packSizeSelect = document.getElementById('pack-size');
  for (let size of packSizes) {
    const option = document.createElement('option');
    option.value = size; 
    option.textContent = size; 
    packSizeSelect.appendChild(option); 
  }
}

//getting elements by id for glazing, pack size, and total price, updated what's selected and changes total price
function updatePrice() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');
  const totalPriceElement = document.getElementById('total-price');
  
  const selectedGlazingPrice = parseFloat(glazingSelect.value);
  const selectedPackSize = parseInt(packSizeSelect.value);
  
  let multiplier = selectedPackSize;
  //if statement for if pack size is 12, price is for 10, 6 -> 5
  if (selectedPackSize === 12) multiplier = 10;
  else if (selectedPackSize === 6) multiplier = 5;
  //calculations
  const totalPrice = (rollBasePrice + selectedGlazingPrice) * multiplier;
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

//updates price if new glazing or pack size is selected
function glazingChange(element) {
  updatePrice();
}

function packSizeChange(element) {
  updatePrice();
}

//modified for hw6, added ability to save the updated cart to localstorage 
function addCart() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');
  const selectedGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;
  const selectedGlazingPrice = parseFloat(glazingSelect.value);
  const selectedPackSize = parseInt(packSizeSelect.value);

  const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, selectedGlazingPrice);
  cart.push(newRoll);
  
  //save updated cart to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
  populateGlaze();
  populatePackSizeOptions();
  updatePrice();

  const addCartButton = document.querySelector('.checkout');
  addCartButton.addEventListener('click', addCart);
});
