//base price
const basePrice = 2.49;

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
  const totalPrice = (basePrice+selectedGlazingPrice)*selectedPackSize;
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