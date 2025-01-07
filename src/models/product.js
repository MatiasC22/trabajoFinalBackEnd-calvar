import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = 'products';


const stringTypeSchemaRequired = {
    type: String,
    required: true,
    trim: true,
};

const numberTypeSchemaRequired = {
    type: Number,
    required: true,
    min: [0, 'El valor no puede ser negativo'], 
    
};

const booleanTypeSchemaRequired = {
    type: Boolean,
    required: true,
    default: true,
};

const categoryTypeSchema = {
  type: String,
  required: true,
  enum: ['Electronicos', 'Ropa', 'Libros', 'Muebles'], 
  trim: true,
};

const productSchema = new mongoose.Schema(
  {
    title:  { 
      ...stringTypeSchemaRequired,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      maxlength: [100, 'El título no puede exceder 100 caracteres'],
  },
    description:  { 
      ...stringTypeSchemaRequired,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
  },
    price: numberTypeSchemaRequired,
    category: categoryTypeSchema,
    stock:{ 
      ...numberTypeSchemaRequired,
      min: [0, 'El stock no puede ser negativo'],
  },
    available: booleanTypeSchemaRequired,
  },
  { timestamps: true }
);



productSchema.plugin(mongoosePaginate);


export const Product = mongoose.model(collectionName, productSchema);

