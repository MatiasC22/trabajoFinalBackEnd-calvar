import { Product } from '../models/product.js';

export default class ProductManager {
  // Obtener todos los productos con paginación y filtros
  async getAllProducts({ limit = 10, page = 1, sort, query }) {
    try {
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
      };

      const filter = query
        ? { $or: [{ category: query }, { available: query === 'true' }] }
        : {};

      const products = await Product.paginate(filter, options);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos: ' + error.message);
    }
  }

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error('Error al obtener el producto: ' + error.message);
    }
  }

  // Crear un nuevo producto
  async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      return await newProduct.save();
    } catch (error) {
      throw new Error('Error al agregar el producto: ' + error.message);
    }
  }

  // Actualizar un producto
  async updateProduct(id, updatedFields) {
    try {
      return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar el producto: ' + error.message);
    }
  }

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}
