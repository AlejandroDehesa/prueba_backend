import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaBaseDatos = path.join(__dirname, 'tienda.db');

const db = new sqlite3.Database(rutaBaseDatos);

const productosIniciales = [
  { id: 'A001', titulo: 'Teclado mecánico', precio: 89.99 },
  { id: 'A002', titulo: 'Ratón gaming', precio: 49.95 },
  { id: 'A003', titulo: 'Monitor 27 pulgadas', precio: 229.90 },
  { id: 'A004', titulo: 'Auriculares inalámbricos', precio: 119.50 },
  { id: 'A005', titulo: 'Webcam Full HD', precio: 59.99 }
];

const contarProductos = () => {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) AS total FROM productos', [], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row.total);
      }
    });
  });
};

const insertarProductosIniciales = () => {
  return new Promise((resolve, reject) => {
    const sentencia = db.prepare(
      'INSERT INTO productos (id, titulo, precio) VALUES (?, ?, ?)'
    );

    for (const producto of productosIniciales) {
      sentencia.run(producto.id, producto.titulo, producto.precio);
    }

    sentencia.finalize((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const inicializarBaseDatos = () => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS productos (
        id TEXT PRIMARY KEY,
        titulo TEXT NOT NULL,
        precio REAL NOT NULL
      )`,
      async (error) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          const totalProductos = await contarProductos();

          if (totalProductos === 0) {
            await insertarProductosIniciales();
            console.log('Productos iniciales insertados correctamente');
          } else {
            console.log('La base de datos ya contiene productos');
          }

          resolve();
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

export const obtenerProductos = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM productos', [], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

export { db };