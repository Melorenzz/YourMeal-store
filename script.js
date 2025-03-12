const cartProductsCount = document.getElementById("cartProductsCount");
const categories = document.querySelectorAll('.category_item');
const addBtn = document.querySelectorAll('.add_button');
const resultPrice = document.getElementById("resultPrice");
const products = document.querySelectorAll('.products_list');
const productsName = document.getElementById("productsName");
const deliveryPrice = document.getElementById("deliveryPrice");
const deliveryPopup = document.getElementById("deliveryPopup");
const placeOrderFirstBtn = document.getElementById("placeOrderFirstBtn");
let countItem = 0;
categories[0].style.backgroundColor = '#FFAB08';

categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(item => { item.style.backgroundColor = '' });
        category.style.backgroundColor = '#FFAB08';
        productsName.innerText = category.innerText;

        const categoriesMap = {
            'Burgers': 0,
            'Snacks': 1,
            'Hot-dogs': 2,
            'Combo': 3,
            'Kebab': 4,
            'Pizza': 5,
            'Wok': 6,
            'Sauce': 8,
            'Desserts': 9
        };
        const categoryIndex = categoriesMap[productsName.innerText];

        if (categoryIndex !== undefined) {
            products.forEach(item => { item.style.display = 'none'; });
            products[categoryIndex].style.display = 'flex';
        }

    });
});
addBtn.forEach(add => {
    add.addEventListener('click', () => {

        const productElement = add.closest('.product');

        const productImage = productElement.querySelector('.productImg');
        const productPrice = productElement.querySelector('.price').innerText;
        const productName = productElement.querySelector('.product_name').innerText;
        const productWeight = productElement.querySelector('.product_weight').innerText;


        add.style.backgroundColor = '#FFAB08';
        if (add.innerText === '✅') {

        } else {
            add.innerText = '✅';
            countItem++;
            resultPrice.innerText = +resultPrice.innerText + +productPrice;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart_item');
            document.querySelector('.cart_items').appendChild(cartItem);
            cartItem.innerHTML = `
                <div class="cart_item-info">
                    <img class="cart_item-img" src="${productImage.src}" alt="">
                    <div class="cart_item-details">
                        <h4>${productName}</h4>
                        <p>${productWeight}</p>
                        <p>${productPrice}</p>
                    </div>
                </div>
                <div class="cart_item-count">
                    <button class="minusBtn">-</button>
                    <p class="itemCount">0</p>
                    <button class="plusBtn">+</button>
                </div>
            `;

            const minusBtn = cartItem.querySelector('.minusBtn');
            const plusBtn = cartItem.querySelector('.plusBtn');
            const itemCount = cartItem.querySelector('.itemCount');

            cartProductsCount.innerText++;
            itemCount.innerText++;

            updateDeliveryPrice()
            checkCartCount()

            plusBtn.addEventListener('click', () => {
                cartProductsCount.innerText++;
                itemCount.innerText++;
                resultPrice.innerText = (+resultPrice.innerText + +productPrice).toFixed(2);
                updateDeliveryPrice()

            });

            minusBtn.addEventListener('click', () => {
                if (itemCount.innerText > 0) {
                    cartProductsCount.innerText--;
                    itemCount.innerText--;
                    resultPrice.innerText = (+resultPrice.innerText - +productPrice).toFixed(2);
                    if (itemCount.innerText < 1) {
                        cartItem.remove();
                        add.style.backgroundColor = '';
                        add.innerText = 'Добавить';
                    }

                }
                checkCartCount()
                updateDeliveryPrice()
            });

        }
    });
});
let popups = document.getElementById('popups');
function updateDeliveryPrice() {
    if (+resultPrice.innerText >= 599) {
        deliveryPrice.innerText = 'Бесплатная доставка';
    } else {
        deliveryPrice.innerText = 'Стоимость доставки: 0.5$';
    }
}

function openPopUpsWindow(){
    popups.style.display = 'flex';
}
function closePopUpsWindow(){
    popups.style.display = 'none';
    deliveryPopup.style.display = 'none';
}
popups.addEventListener('click', closePopUpsWindow);
placeOrderFirstBtn.addEventListener('click', () => {
    openPopUpsWindow();
    deliveryPopup.style.display = 'flex';


})
document.getElementById('closeDeliveryPopup').addEventListener('click', () => {
    closePopUpsWindow();
})
deliveryPopup.addEventListener('click', (e) => {
    e.stopPropagation();
})
function checkCartCount() {
    if (cartProductsCount.innerText === '0'){
        placeOrderFirstBtn.disabled = true;
    }else{
        placeOrderFirstBtn.disabled = false;
    }
}
placeOrderFirstBtn.disabled = true;

const deliveryMethods = document.querySelectorAll('input[name="deliveryMethod"]');

deliveryMethods.forEach((radio) => {
    radio.addEventListener('change', () => {
        if (document.getElementById('deliveryRadio').checked) {
            document.getElementById('streetDelivery').style.display = 'flex';
            document.getElementById('floorDelivery').style.display = 'flex';
        } else {
            document.getElementById('streetDelivery').style.display = 'none';
            document.getElementById('floorDelivery').style.display = 'none';
        }
    });
});

const allCartItems = document.getElementById("allCartItems");
const cart = document.getElementById("cart");

let isCartOpen = false;
cart.addEventListener("click", (e) => {
    if(window.innerWidth > 1279){
        return
    }
    if(!isCartOpen && window.innerWidth <= 1279){
        allCartItems.style.display = 'block';
        isCartOpen = true;

    }else{
        allCartItems.style.display = 'none';
        isCartOpen = false;
    }
})