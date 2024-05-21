
const products = new Map();

// Додавання продукту
function addProduct() {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productQuantityInput = document.getElementById('productQuantity');

    const productName = productNameInput.value;
    const productPrice = parseFloat(productPriceInput.value);
    const productQuantity = parseInt(productQuantityInput.value);

    if (!productName || isNaN(productPrice) || isNaN(productQuantity)) {
        alert('Будь ласка, заповніть всі поля правильно.');
        return;
    }

    products.set(productName, { price: productPrice, quantity: productQuantity });
    displayProducts();

    
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
}


// Видалення продукту
function deleteProduct(productName) {
    products.delete(productName);
    displayProducts();
}

// Редагування інформації про продукт
function editProduct(productName) {
    const newPrice = prompt(`Введіть нову ціну для продукту "${productName}"`);
    const newQuantity = prompt(`Введіть нову кількість для продукту "${productName}"`);

    if (newPrice === null || newQuantity === null) {
        return; 
    }

    const price = parseFloat(newPrice);
    const quantity = parseInt(newQuantity);

    if (isNaN(price) || isNaN(quantity)) {
        alert('Будь ласка, введіть правильні значення для ціни та кількості.');
        return;
    }

    products.set(productName, { price: price, quantity: quantity });
    displayProducts();
}

// Відображення списку продуктів
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((value, key) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${key} - Ціна: ${value.price}, Кількість на складі: ${value.quantity}`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Редагувати';
        editButton.onclick = function() {
            editProduct(key);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.onclick = function() {
            deleteProduct(key);
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        productList.appendChild(listItem);
    });
}

// Пошук продукту за назвою
function searchProduct() {
    const searchInput = document.getElementById('searchProduct').value.trim();
    if (searchInput === '') {
        alert('Будь ласка, введіть назву продукту для пошуку.');
        return;
    }

    if (products.has(searchInput)) {
        const productInfo = products.get(searchInput);
        alert(`Назва: ${searchInput}\nЦіна: ${productInfo.price}\nКількість на складі: ${productInfo.quantity}`);
    } else {
        alert('Продукт не знайдено.');
    }
}

// Замовлення продукту
function orderProduct() {
    const productName = prompt('Введіть назву продукту:');
    if (!productName) {
        alert('Будь ласка, введіть назву продукту для замовлення.');
        return;
    }

    const quantityToOrder = parseInt(prompt(`Введіть кількість для замовлення продукту "${productName}":`));
    if (isNaN(quantityToOrder) || quantityToOrder <= 0) {
        alert('Будь ласка, введіть правильну кількість для замовлення.');
        return;
    }

    if (!products.has(productName)) {
        alert(`Продукт "${productName}" не знайдено.`);
        return;
    }

    const product = products.get(productName);
    if (product.quantity < quantityToOrder) {
        alert(`На складі недостатньо продукту "${productName}".`);
        return;
    }

    product.quantity -= quantityToOrder;
    alert(`Замовлено ${quantityToOrder} одиниць продукту "${productName}".`);
    displayProducts();
}

