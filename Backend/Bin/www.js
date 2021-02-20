#!/usr/bin/env node

/**
 * * Módulos y dependencias.
 */

import { createServer } from "http";
import app from "../app";

const debug = require("debug")("backend:server");

/**
 * * Normaliza un puerto en un número
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * * Obteniendo el puerto del entorno y usarlo en Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * * Detector de eventos para el evento "error" del servidor HTTP.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // manejar errores de escucha específicos con mensajes amigables
  switch (error.code) {
    case "EACCES":
      console.error(`${bind}, Requiere Privilegios`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} Esta en uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * * Creando Servidor HTTP.
 */

const server = createServer(app);

/**
 * * Detector de eventos, para eventos de "escucha" del servidor HTTP.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * * Escucha en el puerto, en todas las interfaces de red.
 */

server.listen(port, () => {
  console.log(`Servidor Iniciado 🚀 
 en el puerto: ${port}`);
});
server.on("error", onError);
server.on("listening", onListening);
