import _sequelize from "sequelize";
import _Test from "./Public/Test";

const { DataTypes } = _sequelize;

export default function initModels(sequelize) {
  const Test = _Test.init(sequelize, DataTypes);

  return {
    Test
  };
}
