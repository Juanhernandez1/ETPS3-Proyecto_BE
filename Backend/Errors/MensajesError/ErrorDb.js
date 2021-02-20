const ErrorDb = {
  ERDB01: {
    error: {
      message: "Error de La base de datos \u{26A0}",
      otros: "puede estar ingresando un identificador existente",
      sugerencia: "cambie el identificador"
    }
  },
  ERDB02: {
    error: {
      message: "Error  La base de datos \u{26A0}",
      otros: "El identificador no existe ",
      sugerencia: "verifique el identificador que ingresa este correctamente escrito"
    }
  },
  ERDB404: {
    message: "No se Encontraron Registros \u{1F50D}",
    otros: "No Se Pude Acceder A La Base De Datos \u{1F6A7}"
  },
  ERDB404LIKE: {
    message: "No se Encontraron Coincidencias En los registros \u{1F50D}",
    otros: "No Se Pude Acceder A La Base De Datos \u{1F6A7}"
  },
  ERDBLOGIN: {
    error: {
      message: "Error de Acceso No existe Usuario con Las Credenciales dadas"
    }
  },
  ERMET_PATH: {
    error: {
      message: "El Método No Es el Correcto para La Petición"
    }
  },
  ERREMP: {
    error: {
      message: "No se puede Registrar El usuario \u{26A0}",
      otros: "Es Posible Que Exista Un Registro Con El Email Ingresado",
      sugerencias: "Cambie El Email o Restablesca Su Contraseña Si la a Olvidado"
    }
  }
};

export default ErrorDb;
