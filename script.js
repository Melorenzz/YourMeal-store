const cartProductsCount = document.getElementById("cartProductsCount");
const categories = document.querySelectorAll('.category_item');
const addBtn = document.querySelectorAll('.add_button');
let countItem = 0;

categories[0].style.backgroundColor = '#FFAB08';


categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(item => { item.style.backgroundColor = '' });
        category.style.backgroundColor = '#FFAB08';
    });
});
addBtn.forEach(add => {
    add.addEventListener('click', () => {
        add.style.backgroundColor = '#FFAB08';

        if (add.innerText === '✅') {

        } else {
            add.innerText = '✅';
            countItem++;


            const cartItem = document.createElement('div');
            cartItem.classList.add('cart_item');
            document.querySelector('.cart_items').appendChild(cartItem);
            cartItem.innerHTML = `
                <div class="cart_item-info">
                    <div class="cart_item-img"></div>
                    <div class="cart_item-details">
                        <h4>Супер сырный</h4>
                        <p>512г</p>
                        <p>550₽</p>
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
            });

            minusBtn.addEventListener('click', () => {
                if (itemCount.innerText > 0) {
                    cartProductsCount.innerText--;
                    itemCount.innerText--;
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
