

//array of objects for glazing 
const glazing = [
  {glaze: "Keep Original", 
    price: 0},
  {glaze: "Sugar Milk", 
    price: 0},
  {glaze: "Vanilla Milk", 
    price: 0.50},
  {glaze: "Double Chocolate", 
    price: 1.50}
];

//pack sizes 
const packSizes = [1, 3, 6, 12];

let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

function updateCart(){
  let selectedGlaze = 
  document.querySelector
}


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
function populateGlaze() 
{
  const glazingSelect = document.getElementById('glazing');
  
  for (let index in glazing) 
    {
        const option =document.createElement('option');
        option.value = glazing[index].price; 
        option.textContent = glazing[index].glaze; 
        glazingSelect.appendChild(option); 
    }
}

//for in loop to populate the pack sizes in the drop down 
function populatePackSizeOptions() 
{

  const packSizeSelect = document.getElementById('pack-size');
  
  for (let index in packSizes) 
    {
        const option = document.createElement('option');
        option.value = packSizes[index]; 
        option.textContent = packSizes[index]; 
        packSizeSelect.appendChild(option); 
    }
}

function updatePrice() 
{
//getting elements by id for glazing, pack size, and total price, updated what's selected and changes total price
  const glazingSelect=document.getElementById('glazing');
  const packSizeSelect=document.getElementById('pack-size');
  const totalPriceElement = document.getElementById('total-price');
  const selectedGlazingPrice = parseFloat(glazingSelect.value);
  const selectedPackSize = parseInt(packSizeSelect.value);
  //calculations
  const totalPrice = (productBasePrice+selectedGlazingPrice)*selectedPackSize;
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

//updates price if new glazing or pack size is selected 
function glazingChange(element) 
{
  updatePrice();
}

function packSizeChange(element) 
{
  updatePrice();
}



document.addEventListener('DOMContentLoaded', () => {
  populateGlaze();
  populatePackSizeOptions();
  updatePrice();
});