// Roll class and constructor
class Roll {
    constructor(type, glazing, size, price, imageURL) {
        this.type = type;
        this.glazing = glazing; 
        this.size = size; 
        this.price = price; 
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
        const totalPrice = (this.price * multiplier).toFixed(2);
        return totalPrice;
    }
}

//new roll set
const rollcardSet = new Set();

//for calculating total price
function calculateTotal() {
    //starting total off at 0 
    let total = 0;

    //calcualte total price for each roll in the cart
    rollcardSet.forEach(roll => {
        total += parseFloat(roll.getTotalPrice());
    });

    //display total price, edge case for if cart is empty
    const totalPriceElement = document.querySelector('#cart-total-price');
    if (rollcardSet.size === 0) {
        totalPriceElement.textContent = "Your cart is empty.";
    } else {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}


function addNewCard(type, glazing, size, price, imageFile) {
    const imageURL = `../assets/products/${imageFile}`;
    let existingRoll = Array.from(rollcardSet).find(roll => roll.type === type && roll.glazing === glazing && roll.size === size);

    //if roll is not in the cart, add it
    if (!existingRoll) {
        const newRoll = new Roll(type, glazing, size, price, imageURL);
        rollcardSet.add(newRoll);
        createElement(newRoll);
    } else {
        //if roll exists, update the total price
        updateElement(existingRoll);
    }

    calculateTotal();
}

//creating the roll card element
function createElement(roll) {
    const template = document.querySelector('#rollcart-template').content.cloneNode(true);
    const cartItemElement = template.querySelector('.cart-item');

    cartItemElement.querySelector('.card-url').src = roll.imageURL;
    cartItemElement.querySelector('.card-title').textContent = roll.type;
    cartItemElement.querySelector('.card-glaze').textContent = roll.glazing;
    cartItemElement.querySelector('.card-size').textContent = `Pack Size: ${roll.size}`;
    cartItemElement.querySelector('.card-price').textContent = `$${roll.getTotalPrice()}`;

    //for handling the remove, recalculating total when something is removed
    cartItemElement.querySelector('.remove-cart').addEventListener('click', () => {
        rollcardSet.delete(roll);
        document.querySelector('#cart-items').removeChild(cartItemElement);
        calculateTotal(); 
    });

    document.querySelector('#cart-items').appendChild(template);
}

function updateElement(roll) {
    const cartItemElement = document.querySelector(`.cart-item[data-type="${roll.type}"][data-glazing="${roll.glazing}"][data-size="${roll.size}"]`);
    cartItemElement.querySelector('.card-price').textContent = `$${roll.getTotalPrice()}`;
}

//adding the four rolls to the cart
addNewCard("Original Cinnammon Roll", "Sugar milk", 1, 2.49, "original-cinnamon-roll.jpg");
addNewCard("Walnut Cinnammon Roll", "Vanilla milk", 12, 3.49, "walnut-cinnamon-roll.jpg");
addNewCard("Raisin Cinnammon Roll", "Sugar milk", 3, 2.99, "raisin-cinnamon-roll.jpg");
addNewCard("Apple Cinnammon Roll", "Keep original", 3, 3.49, "apple-cinnamon-roll.jpg");

//calculating total 
calculateTotal();
