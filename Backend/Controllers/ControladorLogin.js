import MensajeError from "../errors/MensajeError";
import CryptContras from "./src/CryptContras";

const { ERDB02, ERREMP, ER500 } = MensajeError;

export default function ControladorLogin(Usuarios, Accesos) {
  const getUsuario = async (Usuario, Contrasena) => {
    try {
      const data = await Accesos.findOne({
        where: { Usuario, Contrasena }
      });
      return data;
    } catch (error) {
      console.log(ERDB02);
    }
    return "no acceso";
  };

  const getUsuarioId = async id => {
    try {
      const data = await Accesos.findOne({
        where: { UidUsuario: id }
      });
      return data;
    } catch (error) {
      console.log(ERDB02);
    }
    return "no encontrado";
  };

  // * crea un registro enviando un objeto completo de la tabla
  const crearUsuario = async (req, res) => {
    try {
      // * resive un objeto usuario y uno de acceso
      const { Usuario, Acceso } = req.body;

      const acceso = { ...Acceso, Contrasena: CryptContras.encriptar(Acceso.Contrasena) };

      const datosEmpleado = await Usuarios.create(Usuario);
      let datosAcceso;
      if (datosEmpleado.dataValues) {
        datosAcceso = await Accesos.create(acceso);
      }

      if (datosAcceso.dataValues) {
        res.status(201).send({
          message:
            "Usuario Registrado Satisfactoriamente Ya Puede Iniciar Sesión \u{1F9D1}\u{200D}\u{1F4BB}"
        });
      }
    } catch (e) {
      if (e.parent.code === "23505") {
        res.status(405).send(ERREMP);
      } else {
        res.status(500).send(ER500);
      }
    }
  };

  return { getUsuario, crearUsuario, getUsuarioId };
}
