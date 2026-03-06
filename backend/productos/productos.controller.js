import { obtenerProductos } from '../database/sqlite.js';

export const verTodosProductos = async () => {
  const productos = await obtenerProductos();
  return productos;
};