import { Cart } from '../models/cart.js';

export default class CartManager {
  // Crear un nuevo carrito
  async createCart() {
    try {
      const newCart = new Cart({ products: [] });
      return await newCart.save();
    } catch (error) {
      throw new Error('Error al crear el carrito: ' + error.message);
    }
  }

  // Obtener un carrito por ID
  async getCartById(id) {
    try {
      return await Cart.findById(id).populate('products.product');
    } catch (error) {
      throw new Error('Error al obtener el carrito: ' + error.message);
    }
  }

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

      if (productIndex >= 0) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      return await cart.save();
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito: ' + error.message);
    }
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

      if (productIndex >= 0) {
        cart.products[productIndex].quantity = quantity;
        return await cart.save();
      } else {
        throw new Error('Producto no encontrado en el carrito');
      }
    } catch (error) {
      throw new Error('Error al actualizar la cantidad del producto: ' + error.message);
    }
  }

  // Eliminar un producto del carrito
  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = cart.products.filter((p) => p.product.toString() !== productId);
      return await cart.save();
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito: ' + error.message);
    }
  }

  // Vaciar un carrito
  async clearCart(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = [];
      return await cart.save();
    } catch (error) {
      throw new Error('Error al vaciar el carrito: ' + error.message);
    }
  }
}

