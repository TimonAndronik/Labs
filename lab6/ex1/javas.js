document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const editModal = document.getElementById('edit-modal');
    const editProductNameInput = document.getElementById('edit-product-name');
    const editProductPriceInput = document.getElementById('edit-product-price');
    const saveChangesBtn = document.getElementById('save-changes-btn');
    const filterInput = document.getElementById('filter');
    const totalPriceElement = document.getElementById('total-price'); // елемент для відображення загальної вартості
    let totalPrice = 0;
    let editingProduct = null;

    function calculateTotalPrice() {
        totalPrice = 0; // скидаємо загальну вартість перед перерахунком
        const products = productList.querySelectorAll('.product-container');

        products.forEach(function(product) {
            const productPriceText = product.querySelector('p').textContent;
            const productPrice = parseFloat(productPriceText.replace('Ціна: ', '').replace('$', '')); // витягуємо ціну товару та конвертуємо у числовий формат
            totalPrice += productPrice;
        });

        // Оновлюємо відображення загальної вартості на сторінці
        totalPriceElement.textContent = `Загальна вартість: $${totalPrice.toFixed(2)}`;
    }

    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
            calculateTotalPrice();
        }
    });
    
    
    

    function filterProducts() {
        const filterText = filterInput.value.toLowerCase();
        const products = Array.from(productList.querySelectorAll('.product-container'));
    
        products.forEach(function(product) {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(filterText)) {
                if (!product.classList.contains('fade-in')) {
                    product.classList.add('fade-in');
                }
                product.style.display = 'block'; // Показуємо елемент, якщо він відповідає критеріям фільтрації
            } else {
                if (!product.classList.contains('fade-out')) {
                    product.classList.add('fade-out');
                }
                product.style.display = 'none'; // Приховуємо елемент, якщо він не відповідає критеріям фільтрації
            }
        });
    }
    
    

    filterInput.addEventListener('input', filterProducts);

    function openEditModal(productContainer) {
        editingProduct = productContainer;
        const productName = productContainer.querySelector('h3').textContent;
        const productPrice = productContainer.querySelector('p').textContent.replace('Ціна: ', '');

        editProductNameInput.value = productName;
        editProductPriceInput.value = productPrice;

        editModal.style.display = 'block';
    }

    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Отримуємо дані про новий товар з форми
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productImage = document.getElementById('product-image').files[0];

        // Створюємо новий елемент для товару
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
        productContainer.classList.add('fade-in');

        const reader = new FileReader();
        reader.onload = function() {
            productContainer.innerHTML = `
                <h3>${productName}</h3>
                <img src="${reader.result}" alt="${productName}">
                <p>Ціна: ${productPrice}</p>
                <button class="delete-btn">Видалити</button>
            `;

            // Додаємо новий елемент до списку товарів
            productList.appendChild(productContainer);
            calculateTotalPrice();
        };

        if (productImage) {
            reader.readAsDataURL(productImage);
        }

        // Очищаємо поля вводу
        addProductForm.reset();
    });

    productList.addEventListener('click', function(event) {
        const productContainer = event.target.closest('.product-container');
        if (productContainer) {
            if (event.target.tagName === 'H3' || event.target.tagName === 'P') {
                openEditModal(productContainer);
            }
        }
    });

    saveChangesBtn.addEventListener('click', function() {
        if (editingProduct) {
            const newProductName = editProductNameInput.value;
            const newProductPrice = editProductPriceInput.value;

            editingProduct.querySelector('h3').textContent = newProductName;
            editingProduct.querySelector('p').textContent = `Ціна: ${newProductPrice}`;

            closeEditModal();
            editingProduct = null;
        }
    });

    function closeEditModal() {
        editModal.style.display = 'none';
    }
    

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeEditModal);

    // Обробник події для кнопки розрахунку загальної вартості
    const calculateTotalPriceBtn = document.getElementById('calculate-total-price-btn');
    calculateTotalPriceBtn.addEventListener('click', calculateTotalPrice);
});
