import { genSaltSync, compareSync, hashSync } from "bcryptjs";

function encriptar(contraseña) {
  const salt = genSaltSync(10);
  const hash = hashSync(contraseña, salt);

  return hash;
}

function comparar(contraseña, contraseñaDB) {
  return compareSync(contraseña, contraseñaDB); // true
}

export default {
  encriptar,
  comparar
};
