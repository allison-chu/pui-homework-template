class Roll {
    constructor(type, glazing, size, price, imageURL) {
        this.type = type;
        this.glazing = glazing;
        this.size = size; // size is now considered the pack size (quantity)
        this.price = price;
        this.imageURL = imageURL;
    }

    getTotalPrice() {
        return (this.price * this.size).toFixed(2); // Use size as the quantity
    }
}

const rollcardSet = new Set();

function calculateTotal() {
    const total = Array.from(rollcardSet).reduce((sum, rollcard) => sum + parseFloat(rollcard.getTotalPrice()), 0);
    document.querySelector('#cart-total-price').textContent = `$${total.toFixed(2)}`;
}

function addNewCard(rollType, rollGlazing, packSize, basePrice, imageFile) {
    const imageURL = `../assets/products/${imageFile}`;
    let rollcard = [...rollcardSet].find(roll => roll.type === rollType && roll.glazing === rollGlazing && roll.size === packSize);

    if (!rollcard) {
        rollcard = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
        rollcardSet.add(rollcard);
    }

    createElement(rollcard);
    calculateTotal();
}

function createElement(roll) {
    const existingElement = document.querySelector(`.cart-item[data-type='${roll.type}'][data-glazing='${roll.glazing}'][data-size='${roll.size}']`);
    
    if (existingElement) {
        const rollPriceElement = existingElement.querySelector('.card-price');
        rollPriceElement.textContent = `$${roll.getTotalPrice()}`;
    } else {
        const clone = document.querySelector('#rollcart-template').content.cloneNode(true);
        const cartItemElement = clone.querySelector('.cart-item');

        cartItemElement.dataset.type = roll.type;
        cartItemElement.dataset.glazing = roll.glazing;
        cartItemElement.dataset.size = roll.size;

        clone.querySelector('.card-url').src = roll.imageURL; 
        clone.querySelector('.card-title').textContent = roll.type; 
        clone.querySelector('.card-glaze').textContent = `Glazing: ${roll.glazing}`; 
        clone.querySelector('.card-size').textContent = `Pack Size: ${roll.size}`; 
        clone.querySelector('.card-price').textContent = `$${roll.getTotalPrice()}`;

        clone.querySelector('.remove-cart').addEventListener('click', () => {
            rollcardSet.delete(roll);
            document.querySelector('#cart-items').removeChild(cartItemElement);
            calculateTotal();
        });

        document.querySelector('#cart-items').appendChild(clone);
    }
}


// Example of adding rolls to the cart
addNewCard("Original", "Sugar milk", 1, 2.49, "original-cinnamon-roll.jpg");
addNewCard("Walnut", "Vanilla milk", 12, 3.49, "walnut-cinnamon-roll.jpg");
addNewCard("Raisin", "Sugar milk", 3, 2.99, "raisin-cinnamon-roll.jpg");
addNewCard("Apple", "Keep original", 3, 3.49, "apple-cinnamon-roll.jpg");

// Calculate the total price initially
calculateTotal();
