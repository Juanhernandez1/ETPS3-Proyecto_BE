import database from "../DataBase";
import initModels from "../Model";
import ControladorCrud from "./ControladorCrud";

const { CnDb, TestConect, Op } = database;

const { Test } = initModels(CnDb);

export default {
  Test: ControladorCrud(Test, Op)
};
