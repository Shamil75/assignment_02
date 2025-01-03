
let cart = [];

document.getElementById('searchButton').addEventListener('click', () => {
    const search = document.getElementById('searchBox').value;
    const Details = document.getElementById('Details');
    Details.innerHTML = '';
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => showDrinks(data.drinks));

});

function DefaultDrinks() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
        .then(res => res.json())
        .then(data => showDrinks(data.drinks));
};

function showDrinks(drinks) {
    const productcontainer = document.getElementById('productcontainer');
    productcontainer.innerHTML = '';

    if (drinks) {
        drinks.forEach(drink => {
            const drinkContainer = document.createElement('div');
            drinkContainer.classList.add('drink-Container');
            const drinkImage = document.createElement('img');
            drinkImage.classList.add('drinkImage');
            drinkImage.src = drink.strDrinkThumb;
            const drinkName = document.createElement('p');
            drinkName.textContent = drink.strDrink;
            const drinkInstructions = document.createElement('p');
            drinkInstructions.textContent = `${drink.strInstructions.slice(0, 15)}`;

            
            const buttonsContaine = document.createElement('div');
            buttonsContaine.classList.add('buttons');
            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('CartBtn');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.addEventListener('click', () => addToCart(drink.strDrink));
            const detailsBtn = document.createElement('button');
            detailsBtn.classList.add('CartBtn');
            detailsBtn.textContent = 'Details';
            detailsBtn.addEventListener('click', () => showDrinkDetails(drink));

            buttonsContaine.appendChild(addToCartBtn);
            buttonsContaine.appendChild(detailsBtn);
            drinkContainer.appendChild(drinkImage);
            drinkContainer.appendChild(drinkName);
            drinkContainer.appendChild(drinkInstructions);
            drinkContainer.appendChild(buttonsContaine);

            productcontainer.appendChild(drinkContainer);
        });
    }
    else {
        const textContent = document.createElement('div');
        textContent.innerHTML = `
            <p class="nothing"><strong>There is nothing for you!!</strong></p>
            `;
            productcontainer.appendChild(textContent);
    }
};

function addToCart(Name) {
    if (cart.length >= 7) {
        alert('You have reached the max limit');
        return;
    }
    cart.push(Name);
    const cartList = document.getElementById('cartList');
    const cartCount = document.getElementById('cartCount');
    cartList.innerHTML = '';
    cart.forEach((Name) => {
        const list = document.createElement('li');
        list.classList.add('cart-item');
        list.textContent = `${Name}`;
        cartList.appendChild(list);
    });
    cartCount.textContent = `Total Drinks: ${cart.length}`;
}

function showDrinkDetails(drink) {
    const Details = document.getElementById('Details');
    Details.innerHTML = `
                <div class="drink-detail">
                    <img class="detailsImage" src="${drink.strDrinkThumb}">
                    <h4>${drink.strDrink}</h4>
                    <p><strong>Category:</strong> ${drink.strCategory}</p>
                    <p><strong>Type:</strong> ${drink.strAlcoholic}</p>
                    <p><strong>Glass:</strong> ${drink.strGlass}</p>
                    <p><strong>Instructions:</strong> ${drink.strInstructions.slice(0, 60)}</p>
                </div>
            `;
}

DefaultDrinks();
