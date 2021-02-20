const ErrorHTTP = {
  ER500: {
    error: {
      status: 500,
      message: "Error Interno Del Servidor \u{2757} ",
      sugerencia: "Intentar mas tarde \u{1F550} o Notifique al encargado de Soporte \u{1F514}"
    }
  },
  ER404: {
    error: {
      status: 404,
      message: "Solicitud No encontrad \u{1F50D} \u{26A0}"
    }
  },
  ER401: {
    error: {
      status: 401,
      message: "Acceso Denegado",
      otros: "No Esta autorizado  \u{1F512}",
      sugerencia: "Notifique a Su Superior"
    }
  },
  ER403: {
    error: {
      status: 403,
      message: "Acceso Denegado",
      otros: "No pose permisos para esta petición  \u{1F512}"
    }
  },
  ER405: {
    error: {
      status: 405,
      message: "Método no Permitido",
      otros: "No esta Permitido Eliminar Datos De Forma Directa \u{1F6D1}"
    }
  }
};
export default ErrorHTTP;
