
function addToCart(productId) {
    
    // Lógica para agregar productos al carrito desde la vista de lista
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

// Lógica para paginación (si es necesario)
document.addEventListener('DOMContentLoaded', function() {
    // Lógica adicional de paginación si es necesario
});

    console.log(`Producto ${productId} agregado al carrito`);
}


