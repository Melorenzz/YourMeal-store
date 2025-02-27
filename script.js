const cartProductsCount = document.getElementById("cartProductsCount");
const categories = document.querySelectorAll('.category_item');
const addBtn = document.querySelectorAll('.add_button');
const resultPrice = document.getElementById("resultPrice");
const products = document.querySelectorAll('.products_list');
const productsName = document.getElementById("productsName");
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

            plusBtn.addEventListener('click', () => {
                cartProductsCount.innerText++;
                itemCount.innerText++;
                resultPrice.innerText = +resultPrice.innerText + +productPrice;
            });

            minusBtn.addEventListener('click', () => {
                if (itemCount.innerText > 0) {
                    cartProductsCount.innerText--;
                    itemCount.innerText--;
                    resultPrice.innerText = +resultPrice.innerText - +productPrice;
                    if (itemCount.innerText < 1) {
                        cartItem.remove();
                        add.style.backgroundColor = '';
                        add.innerText = 'Добавить';
                    }
                }
            });
        }
    });
});
