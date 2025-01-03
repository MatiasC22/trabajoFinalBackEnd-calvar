import { Router } from 'express';
import { Cart } from '../models/cart.js'; 
import { Product } from '../models/product.js'; 

const router = Router();

// Obtener un carrito por ID con productos poblados
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Agregar un producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        const product = await Product.findById(pid);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find((p) => p.product.equals(pid));
        if (existingProduct) {
            existingProduct.quantity += 1; // Incrementar cantidad
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ status: 'success', message: 'Producto agregado al carrito', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        const productInCart = cart.products.find((p) => p.product.equals(pid));
        if (!productInCart) return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });

        productInCart.quantity = quantity;
        await cart.save();

        res.status(200).json({ status: 'success', message: 'Cantidad actualizada', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        cart.products = cart.products.filter((p) => !p.product.equals(pid));
        await cart.save();

        res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        cart.products = [];
        await cart.save();

        res.status(200).json({ status: 'success', message: 'Carrito vacío', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
