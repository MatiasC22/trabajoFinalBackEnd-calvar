import { Router } from 'express';
import { Product } from '../models/product.js';

const router = Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('index');
});

// Ruta para mostrar productos
router.get('/products', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  
  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
    lean: true,
  };

  const filter = query
    ? {
        $or: [
          { category: new RegExp(query, 'i') },
          { available: query.toLowerCase() === 'true' },
        ],
      }
    : {};

  try {
    const products = await Product.paginate(filter, options);

    
    products.prevLink = products.hasPrevPage
      ? `/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`
      : null;
    products.nextLink = products.hasNextPage
      ? `/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
      : null;

    // Renderizamos la vista `products` y pasamos los productos y la información de paginación
    res.render('products', {
      products: products.docs,  
      page: products.page,      
      totalPages: products.totalPages, 
      prevLink: products.prevLink,     
      nextLink: products.nextLink,    
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar los productos');
  }
});

export default router;

