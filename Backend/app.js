import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import logger from "morgan";

import indexRouter from "./Routes";
import ErrorServer from "./Errors";

/**
 * * Se utiliza express-generator
 * * El Cual Contiene Algunas Configuraciones Predeterminadas
 * ! de las cuales se eliminan las que no se están usando
 */

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * ? Parte del Motor de Visualización
 * app.use(express.static(join(__dirname, 'public')));
 */

/**
 * * Creando Endpoint
 */
app.use("/API", indexRouter);

/**
 * * Captura las solicitudes no encontradas en los Endpoint
 * * enviando un error 404 al controlador de errores
 */

app.use((req, res, next) => {
  next(createError(404));
});

/**
 * * Controlador de Errores
 */

app.use(ErrorServer);

export default app;
