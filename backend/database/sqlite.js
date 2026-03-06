import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaBaseDatos = path.join(__dirname, 'tienda.db');

const db = new sqlite3.Database(rutaBaseDatos);

export const inicializarBaseDatos = () => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS productos (
        id TEXT PRIMARY KEY,
        titulo TEXT NOT NULL,
        precio REAL NOT NULL
      )`,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
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
