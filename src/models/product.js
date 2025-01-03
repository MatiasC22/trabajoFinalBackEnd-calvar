import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = 'products';


const stringTypeSchemaRequired = {
    type: String,
    required: true,
};

const numberTypeSchemaRequired = {
    type: Number,
    required: true,
};

const booleanTypeSchemaRequired = {
    type: Boolean,
    required: true,
};


const productSchema = new mongoose.Schema({
    title: stringTypeSchemaRequired,
    description: stringTypeSchemaRequired,
    price: numberTypeSchemaRequired,
    category: stringTypeSchemaRequired,
    stock: numberTypeSchemaRequired,
    available: booleanTypeSchemaRequired,
});


productSchema.plugin(mongoosePaginate);


export const Product = mongoose.model(collectionName, productSchema);

