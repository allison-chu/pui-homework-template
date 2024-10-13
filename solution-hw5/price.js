// array of objects for glazing 
const glazing = [
  { glaze: "Keep Original", price: 0 },
  { glaze: "Sugar Milk", price: 0 },
  { glaze: "Vanilla Milk", price: 0.50 },
  { glaze: "Double Chocolate", price: 1.50 }
];

// pack sizes 
const packSizes = [1, 3, 6, 12];

let cart = []; // Shared cart array for both files

// Define the Roll class
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }

  // Method to calculate total price
  getTotalPrice() {
      return ((this.basePrice + this.glazing.price) * this.size).toFixed(2);
  }
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const rollInfo = rolls[rollType]; // Get roll info based on the URL
const rollTitle = document.querySelector('#top-text');
const rollImage = document.querySelector('#product-image-detail');
//rollTitle.textContent = rollType + " Cinnamon Roll";
rollImage.src = "../assets/products/" + rollInfo.imageFile;
const rollBasePrice = rollInfo.basePrice;

// Populate glazing and pack sizes in dropdowns
function populateGlaze() {
  const glazingSelect = document.getElementById('glazing');
  glazing.forEach(item => {
      const option = document.createElement('option');
      option.value = item.price; 
      option.textContent = item.glaze; 
      glazingSelect.appendChild(option); 
  });
}

function populatePackSizeOptions() {
  const packSizeSelect = document.getElementById('pack-size');
  packSizes.forEach(size => {
      const option = document.createElement('option');
      option.value = size; 
      option.textContent = size; 
      packSizeSelect.appendChild(option); 
  });
}

function updatePrice() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');
  const totalPriceElement = document.getElementById('total-price');

  const selectedGlazingPrice = parseFloat(glazingSelect.value);
  const selectedPackSize = parseInt(packSizeSelect.value);

  let multiplier = selectedPackSize;
  if (selectedPackSize === 12) {
      multiplier = 10; 
  } else if (selectedPackSize === 6) {
      multiplier = 5; 
  }

  const totalPrice = (rollBasePrice + selectedGlazingPrice) * multiplier;
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function addCart() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');
  
  const selectedGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;
  const selectedPackSize = parseInt(packSizeSelect.value);
  
  const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, rollBasePrice);
  cart.push(newRoll);
  console.log(cart);
}

// Initialize dropdowns and price
document.addEventListener('DOMContentLoaded', () => {
  populateGlaze();
  populatePackSizeOptions();
  updatePrice();

  const addCartButton = document.querySelector('.checkout');
  addCartButton.addEventListener('click', addCart);
});
