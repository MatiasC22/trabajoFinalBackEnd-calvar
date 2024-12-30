import { Router } from 'express';
import { Product } from '../models/product.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

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

  const products = await Product.paginate(filter, options);

  products.prevLink = products.hasPrevPage
    ? `/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`
    : null;
  products.nextLink = products.hasNextPage
    ? `/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
    : null;

  res.render('products', products);
});

export default router;
