import { Sequelize, Op } from "sequelize";
import { config } from "dotenv";

config();

let CnDb;
if (process.env.DATABASE_URL) {
  CnDb = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  CnDb = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB_DIALECT,
    protocol: process.env.DB_PROTOCOL,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}

(async () => {
  try {
    await CnDb.authenticate();
    console.log("Conexión Establecida Satisfactoriamente. \u{1F680}");
  } catch (error) {
    console.error("No se puede conectar a la base de datos. \u{1F622}");
  }
})();

Sequelize.postgres.DECIMAL.parse = function (value) {
  return parseFloat(value);
};

async function TestConect() {
  try {
    await CnDb.authenticate();
    console.log("Conexión Establecida Satisfactoriamente. \u{1F680}");
  } catch (error) {
    console.error("No se puede conectar a la base de datos. \u{1F622}");
  }
}

export default {
  CnDb,
  Op,
  TestConect
};
