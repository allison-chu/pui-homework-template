//Roll class and constructor
class Roll {
    constructor(type, glazing, size, basePrice, glazingPrice, imageURL) {
        this.type = type;
        this.glazing = glazing; 
        this.size = size; 
        this.basePrice = parseFloat(basePrice);
        this.glazingPrice = parseFloat(glazingPrice);
        this.imageURL = imageURL;
    }

    getTotalPrice() {
        let multiplier = this.size; 
        //if statement for if pack size is 12, price is for 10, 6 -> 5
        if (this.size === 12) {
            multiplier = 10; 
        } else if (this.size === 6) {
            multiplier = 5; 
        }
        // calculate total price
        const totalPrice = ((this.basePrice + this.glazingPrice) * multiplier).toFixed(2);
        return totalPrice;
    }
}
//new roll set
let rollcardSet = new Set();

//new function for hw6 to save cart to local storage, cart is saved even if page is refreshed 
function saveCart() {
    //converting set of roll objects to array 
    const cartArray = Array.from(rollcardSet);
    //saving to a string format, localstorage only supports strings 
    localStorage.setItem('cart', JSON.stringify(cartArray));
}

//new function for hw6, retrieves cart data from localstorage 
function loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    rollcardSet = new Set();
    //for each loop for each item in the stored cart 
    storedCart.forEach(item => {
        //getting the data for the rolls from rollsData.js
        const rollData = rolls[item.type];
        if (!rollData) {
            console.error("Roll data not found for type:", item.type);
            return;
        }
        const basePrice = rollData.basePrice;
        const imageFile = rollData.imageFile;
        const imageURL = `../assets/products/${imageFile}`;

        const newRoll = new Roll(
            item.type,
            item.glazing,
            item.size,
            basePrice,
            item.glazingPrice,
            imageURL
        );
        rollcardSet.add(newRoll);
    });
}

function calculateTotal() {
    let total = 0;
    rollcardSet.forEach(roll => {
        total += parseFloat(roll.getTotalPrice());
    });

    const totalPriceElement = document.querySelector('#cart-total-price');
    if (rollcardSet.size === 0) {
        totalPriceElement.textContent = "Your cart is empty.";
    } else {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}

//creating the roll card element
function createElement(roll) {
    const template = document.querySelector('#rollcart-template').content.cloneNode(true);
    const cartItemElement = template.querySelector('.cart-item');

    cartItemElement.querySelector('.card-url').src = roll.imageURL;
    cartItemElement.querySelector('.card-title').textContent = roll.type + " Cinnamon Roll";
    cartItemElement.querySelector('.card-glaze').textContent = "Glazing: " + roll.glazing;
    cartItemElement.querySelector('.card-size').textContent = `Pack Size: ${roll.size}`;
    cartItemElement.querySelector('.card-price').textContent = `$${roll.getTotalPrice()}`;
    //for handling the remove, recalculating total when something is removed
    cartItemElement.querySelector('.remove-cart').addEventListener('click', () => {
        rollcardSet.delete(roll);
        document.querySelector('#cart-items').removeChild(cartItemElement);
        calculateTotal(); 
        saveCart();
    });

    document.querySelector('#cart-items').appendChild(cartItemElement);
}

//initialize cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    //populate cart on page load
    rollcardSet.forEach(roll => {
        createElement(roll);
    });
    //calculating total 
    calculateTotal();
});
