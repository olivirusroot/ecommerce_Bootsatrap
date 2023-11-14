// Espera hasta que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene todos los botones para agregar al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // Obtiene el elemento que muestra la cantidad de productos en el carrito
    const cartCount = document.getElementById('cart-count');
    // Obtiene el contenedor de los elementos del carrito
    const cartItems = document.getElementById('cart-items');

    // Agrega un evento a cada botón de agregar al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtiene la tarjeta de producto más cercana al botón clickeado
            const card = this.closest('.card');
            // Obtiene el nombre y la imagen del producto de la tarjeta
            const productName = card.querySelector('.card-title').textContent;
            const productImage = card.querySelector('.card-img-top').src;
            // Agrega el producto al carrito
            addToCart(productName, productImage);
        });
    });

    // Función para agregar productos al carrito
    function addToCart(productName, productImage) {
        // Busca si el producto ya existe en el carrito
        let existingCartItem = Array.from(cartItems.children).find(item => item.dataset.name === productName);
        
        // Si el producto ya está en el carrito, incrementa su cantidad
        if (existingCartItem) {
            let quantityElement = existingCartItem.querySelector('.quantity');
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        } else {
            // Si no está, crea un nuevo elemento en el carrito para este producto
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item');
            cartItem.dataset.name = productName;
            cartItem.innerHTML = `
                <img src="${productImage}" class="cart-item-image" alt="${productName}" style="width: 50px; height: auto; margin-right: 10px;" />
                ${productName} - <span class="quantity">1</span>
                <button class="btn btn-danger btn-sm remove-item">Eliminar Todo</button>
                <button class="btn btn-warning btn-sm decrease-item">-</button>
            `;
            cartItems.appendChild(cartItem);

            // Agrega eventos para los botones de eliminar y disminuir cantidad
            cartItem.querySelector('.remove-item').addEventListener('click', function() {
                cartItem.remove();
                updateCartCount();
            });

            cartItem.querySelector('.decrease-item').addEventListener('click', function() {
                let quantityElement = cartItem.querySelector('.quantity');
                let currentQuantity = parseInt(quantityElement.textContent);
                if (currentQuantity > 1) {
                    quantityElement.textContent = currentQuantity - 1;
                } else {
                    cartItem.remove();
                }
                updateCartCount();
            });
        }
        // Actualiza el contador del carrito
        updateCartCount();
    }

    // Función para actualizar la cantidad total de productos en el carrito
    function updateCartCount() {
        let totalQuantity = Array.from(cartItems.querySelectorAll('.quantity'))
                                .reduce((total, quantityElement) => total + parseInt(quantityElement.textContent), 0);
        cartCount.textContent = totalQuantity;
    }
});
