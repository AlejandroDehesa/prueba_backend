import Joi from 'joi';

export const validaTitulo = (titulo) => {
  const schema = Joi.string().min(3).max(100).required();
  return schema.validate(titulo);
};

export const validaPrecio = (precio) => {
  const schema = Joi.number().positive().required();
  return schema.validate(precio);
};