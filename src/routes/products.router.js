import { Router } from 'express';
import { Product } from '../models/product.js';

const router = Router();

// Ruta para obtener productos con paginación
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? {
          $or: [
            { category: new RegExp(query, 'i') },
            { available: query.toLowerCase() === 'true' },
          ],
        }
      : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
      lean: true,
    };

    const result = await Product.paginate(filter, options);

    result.prevLink = result.hasPrevPage
      ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}`
      : null;
    result.nextLink = result.hasNextPage
      ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}`
      : null;

    res.status(200).json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Nueva ruta para cargar productos
router.post('/', async (req, res) => {
  try {
    const { title, description, price, category, stock, available } = req.body;

    // Validación de campos obligatorios
    if (!title || !description || !price || !category || !stock) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios: title, description, price, category, stock',
      });
    }

    // Crear un nuevo producto
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      available: available !== undefined ? available : true,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      status: 'success',
      message: 'Producto creado exitosamente',
      payload: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al guardar el producto', error });
  }
});

export default router;

