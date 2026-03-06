import express from 'express';
import { apiKeyMiddleware } from './middleware/apiKey.middleware.js';
import { verTodosProductos } from './productos/productos.controller.js';
import { inicializarBaseDatos } from './database/sqlite.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(apiKeyMiddleware);

app.get('/', (req, res) => {
  res.send('API backend funcionando correctamente');
});

app.get('/productos', async (req, res) => {
  try {
    const productos = await verTodosProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

inicializarBaseDatos().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
  });
});