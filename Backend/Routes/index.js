import { Router } from "express";

import controllers from "../Controllers";
import RV1 from "./API_RUTAS_V1";

const Rutas = Router();

const RutasV1 = RV1(Router, controllers);
// * ruta de version
Rutas.use("/v1", RutasV1);

export default Rutas;
