import { Router } from 'express';
import { Product } from '../models/product.js';

const router = Router();

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

export default router;
