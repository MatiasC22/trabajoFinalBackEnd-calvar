import mongoose from "mongoose";

const userCollection = 'usuarios';

// Definimos el esquema de nuestra coleccion

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    curso: String,
    email: {
        type: String,
        unique: true,
        required: true 
    },
    age: Number 
})

export  const userModel= mongoose.model(userCollection, userSchema)