import MensajeError from "../Errors/MensajesError";
import CondicionesOR from "./src/CondicionesSql";
import Vista from "./src/Vista";

const { ERDB404LIKE, ERDB01, ERDB02, ERDB404 } = MensajeError.ErrorDb;
const { ER405, ER500 } = MensajeError.ErrorHTTP;

// * CRUD
export default function ControladorCrud(objetoModelo, Op) {
  // * datos que servirán como parámetro de es lo que de debe mostrar
  const { campoPk, condicion, include } = objetoModelo.Setting();

  // * condiciones de consulta
  const { WhereLike, WhereStado, Where } = condicion;
  const { campoE, valor, deleteR } = WhereStado;

  // * muestra todos los datos condicionado a estado si es indicado
  const todos = async (req, res) => {
    try {
      // * parámetro para reemplazar el estado predeterminado
      const { estadop } = req.params;
      let estado;
      // * validando que exista la variable estadop y reemplazar el estado
      if (estadop !== undefined) {
        estado = estadop;
      } else {
        estado = valor;
      }
      // * Objeto de Configuración de Consulta
      const obj =
        estado !== null
          ? {
              raw: true,
              nest: true
            }
          : {
              raw: true,
              nest: true,
              where: { [campoE]: estado }
            };

      const data = await objetoModelo.findAll(obj);

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send(ERDB404);
      }
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  // * muestra una vista de datos de tablas relacionadas y condicionado a estado si es indicado
  const vistaTodos = async (req, res) => {
    try {
      // * parámetro para reemplazar el estado predeterminado
      const { estadop } = req.params;
      let estado;
      // * validando que exista la variable estadop y reemplazar el estado
      if (estadop !== undefined) {
        estado = estadop;
      } else {
        estado = valor;
      }
      // * Objeto de Configuración de Consulta
      const obj =
        estado !== null
          ? {
              include,
              raw: true,
              nest: true
            }
          : {
              include,
              raw: true,
              nest: true,
              where: { [campoE]: estado }
            };

      let data = await objetoModelo.findAll(obj);
      let contaObj = 0;

      // * Ciclo para crear un solo objeto por registro y no tenes objetos anidados
      do {
        if (include !== null) data = Vista(data, Where);
        const objPrueba = { ...data[0] };
        contaObj = 0;
        let contador2 = 0;
        Object.keys(objPrueba).forEach(propieda => {
          if (typeof objPrueba[propieda] === "object") {
            contador2 += 1;
          }
        });
        contaObj = contador2;
      } while (contaObj !== 0);

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send(ERDB404);
      }
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  // * muestra datos según la pk indicada
  // * si las pk es compuesta enviar los datos separados por "-"
  const buscarXpk = async (req, res) => {
    try {
      const { id } = req.params;

      const data = await objetoModelo.findByPk(id);

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send(ERDB02);
      }
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  // * busca por medio del uso de like en los campos preestablecidos
  const buscarUnoX = async (req, res) => {
    try {
      const { dato } = req.params;

      const busqueda = CondicionesOR(WhereLike, dato, Op);

      const data = await objetoModelo.findOne({
        where: { [Op.or]: busqueda }
      });

      if (data) {
        res.status(201).send(data);
      } else {
        res.status(404).send(ERDB404LIKE);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  // * busca por medio del uso de like en los campos preestablecidos
  const buscarMuchosX = async (req, res) => {
    try {
      const { dato } = req.params;

      const busqueda = CondicionesOR(WhereLike, dato, Op);

      const data = await objetoModelo.findAll({
        where: { [Op.or]: busqueda }
      });

      if (data) {
        res.status(201).send(data);
      } else {
        res.status(404).send(ERDB404LIKE);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  // * crea un registro enviando un objeto completo de la tabla
  const crear = async (req, res) => {
    try {
      const objBody = req.body;
      const data = await objetoModelo.create(objBody);

      if (data.dataValues) {
        res.status(201).send({
          message: "Registro Creado Satisfactoriamente"
        });
      }
    } catch (e) {
      if (e.parent.code === "23505") {
        res.status(406).send(ERDB01);
      } else {
        res.status(500).send(ER500);
      }
    }
  };

  // * actualizar un registro enviando un objeto completo de la tabla
  // * agregado una propiedad llamada Pk al objeto para con los valores de los campos
  // * que corresponden ea la pk de la tabla
  const actualizar = async (req, res) => {
    try {
      const id = req.body[campoPk];
      delete req.body[campoPk];

      const data = await objetoModelo.update(req.body, {
        where: { [campoPk]: id }
      });
      if (data[0] === 1) {
        res.status(202).send({
          message: "Registro Actualizado Satisfactoriamente"
        });
      } else {
        res.status(404).send(ERDB02);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  // * Eliminar un registro según la pk indicada
  // * si las pk es compuesta enviar los datos separados por ","
  const eliminar = async (req, res) => {
    try {
      const { id } = req.params;

      if (objetoModelo.fieldAttributeMap.estado === campoPk) {
        const data = await objetoModelo.update(
          { [campoE]: deleteR },
          {
            where: { [campoPk]: id }
          }
        );

        if (data) {
          res.status(202).send({
            message: "Registro Eliminado Satisfactoriamente"
          });
        } else {
          res.status(404).send(ERDB02);
        }
      } else if (objetoModelo.fieldAttributeMap.id_test === campoPk) {
        const data = await objetoModelo.destroy({
          where: { [campoPk]: id }
        });

        if (data) {
          res.status(202).send({
            message: "Registro Eliminado Satisfactoriamente"
          });
        }
      } else {
        res.status(405).send(ER405);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  const test = (req, res) => {
    try {
      res.status(202).send({
        message: "Esto es una prueba"
      });
    } catch (e) {
      res.status(500).send(e);
    }
  };

  return {
    todos,
    crear,
    eliminar,
    actualizar,
    buscarUnoX,
    buscarMuchosX,
    buscarXpk,
    vistaTodos,
    test
  };
}
