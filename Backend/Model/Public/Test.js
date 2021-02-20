import _sequelize from "sequelize";

const { Model, Sequelize } = _sequelize;

export default class Test extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        IdTest: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "id_test"
        },
        Datos: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "datos"
        }
      },
      {
        sequelize,
        tableName: "test",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "test_pkey",
            unique: true,
            fields: [{ name: "id_test" }]
          }
        ]
      }
    );
    return Test;
  }

  static Setting() {
    // * llave primaria
    const llavepk = this.primaryKeyAttributes[0];
    // * Estado del registro
    const campoE = this.fieldAttributeMap.tipo;
    // * objetos para comparacion
    const Mapobjeto1 = { ...this.fieldAttributeMap };
    const Mapobjeto2 = { ...this.fieldAttributeMap };
    // * Eliminados Campos
    Object.keys(Mapobjeto1).forEach(key => {
      if (Mapobjeto1[key] === "Estado" || Mapobjeto1[key] === llavepk || key.search("uid") === 0) {
        delete Mapobjeto1[key];
      }
    });
    // * lista de campos que permitiran busqueda por like
    const whereLike = Object.values(Mapobjeto1);
    // * Eliminando Campos
    Object.keys(Mapobjeto2).forEach(key => {
      if (key.search("uid") !== 0) {
        delete Mapobjeto2[key];
      }
    });
    // * lista de campos que permiten consultas and
    const whereAND = Object.values(Mapobjeto2);
    // * lista de tablas relacionadas
    const asocicion = Object.values(this.associations);

    return {
      campoPk: llavepk,
      asocicion,
      condicion: {
        WhereLike: whereLike,
        WhereStado: { campoE },
        Where: whereAND
      },
      vista: null
    };
  }
}
