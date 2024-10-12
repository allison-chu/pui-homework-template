
class Roll {
    constructor(type, glazing, size, price, imageURL, quantity = 1) {
        this.type = type;
        this.glazing = glazing;
        this.size = size;
        this.price = price;
        this.imageURL = imageURL; 
        this.quantity = quantity; 
    }

    getTotalPrice() {
        return (this.price * this.quantity).toFixed(2);
    }
}


const rollcardSet = new Set();


function calculateTotal() {
    let total = 0;
    for (const rollcard of rollcardSet) {
        total += parseFloat(rollcard.getTotalPrice());
    }
    document.querySelector('#cart-total-price').textContent = `$${total.toFixed(2)}`;
}

// Function to add a new roll to the cart
function addNewCard(rollType, rollGlazing, packSize, basePrice, imageFile) {
    const imageURL = `../assets/products/${imageFile}`; // Construct the image URL based on the file name
    let rollcard = [...rollcardSet].find(roll => roll.type === rollType && roll.glazing === rollGlazing && roll.size === packSize);

    if (rollcard) {
        rollcard.quantity += 1; // Update quantity if roll already exists in the cart
    } else {
        rollcard = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
        rollcardSet.add(rollcard);
    }

    createElement(rollcard); // Create and append the element for the roll
    calculateTotal(); // Update the total price
}

// Function to create an element for a roll in the cart
function createElement(roll) {
    // Check if the roll already exists in the DOM
    let existingElement = document.querySelector(`.cart-item[data-type='${roll.type}'][data-glazing='${roll.glazing}'][data-size='${roll.size}']`);
    if (existingElement) {
        // Update the quantity and total price in the existing element
        const quantityElement = existingElement.querySelector('.card-quantity');
        const rollPriceElement = existingElement.querySelector('.card-price');
        roll.quantity += 1; // Increment the quantity
        quantityElement.textContent = `Quantity: ${roll.quantity}`;
        rollPriceElement.textContent = `$${roll.getTotalPrice()}`; // Update the total price
    } else {
        const template = document.querySelector('#rollcart-template');
        const clone = template.content.cloneNode(true);

        // Set attributes to identify this roll
        const cartItemElement = clone.querySelector('.cart-item');
        cartItemElement.setAttribute('data-type', roll.type);
        cartItemElement.setAttribute('data-glazing', roll.glazing);
        cartItemElement.setAttribute('data-size', roll.size);

        const rollImageElement = clone.querySelector('.card-url');
        const rollTitleElement = clone.querySelector('.card-title');
        const rollGlazeElement = clone.querySelector('.card-glaze');
        const rollSizeElement = clone.querySelector('.card-size');
        const rollPriceElement = clone.querySelector('.card-price');
        const quantityElement = clone.querySelector('.card-quantity');
        const removeButton = clone.querySelector('.remove-cart');

        // Set the content for the cloned template
        rollImageElement.src = roll.imageURL; 
        rollTitleElement.textContent = roll.type; 
        rollGlazeElement.textContent = `Glazing: ${roll.glazing}`; 
        rollSizeElement.textContent = `Pack Size: ${roll.size}`; 
        rollPriceElement.textContent = `$${roll.getTotalPrice()}`; 
        quantityElement.textContent = `Quantity: ${roll.quantity}`;

        // Add an event listener to the remove button
        removeButton.addEventListener('click', () => {
            rollcardSet.delete(roll); // Remove roll from the set
            document.querySelector('#cart-items').removeChild(cartItemElement); // Remove the item from the DOM
            calculateTotal(); // Update total price after removal
        });

        // Append the clone to the DOM
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
