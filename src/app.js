import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './util.js';
import DBPATH from './server.js';

// Routers
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

// Configuración de la app
const app = express();
const PORT = process.env.PORT || 9090;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// MongoDB
const DBPATH = 'mongodb://localhost:27017/ecommerce'; // Cambia a tu conexión real
mongoose
  .connect(DBPATH, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Iniciar servidor
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Configuración de WebSocket
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  // Aquí puedes manejar eventos adicionales relacionados con WebSocket
});
