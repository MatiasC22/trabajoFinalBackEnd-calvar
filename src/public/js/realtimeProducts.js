/*const socket = io();

// Actualizar la lista de productos
socket.on('updateProducts', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.title} - $${product.price}
            <button onclick="deleteProduct(${product.id})">Quitar</button>
        `;
        productList.appendChild(li);
    });
});

// Agregar un producto
function addProduct(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    socket.emit('addProduct', { title, price });
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
}

// Quitar un producto
function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
}

// Eliminar todos los productos
function deleteAllProducts() {
    socket.emit('deleteAllProducts');
}
*/
function addToCart(productId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado al carrito', data);
        alert('Producto agregado al carrito');
    })
    .catch(error => {
        console.error('Error al agregar producto al carrito:', error);
        alert('Hubo un error al agregar el producto al carrito');
    });
}
