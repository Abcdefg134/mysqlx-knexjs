const { default: mysqlx } = require("mysqlx");

const config = {
  host: "localhost",
  port: 33060,
  user: "root",
  password: "123456",
  schema: "knex",
};
const db = async () => {
  let dictSession;
  try {
    dictSession = await mysqlx.getSession(config);
  } catch (error) {
    console.log(error);
  }
    return dictSession;
  
};

const connectToSchema = async () => {
  let dictSession;
  let knexSchema;
  try {
    dictSession = await mysqlx.getSession(config);
    try {
      knexSchema = await dictSession.getSchema("knex");
    } catch (error) {
      console.log(error);
    }
    return knexSchema;
  } catch (error) {
    console.log(error);
  }
  return knexSchema;
};

module.exports = { connectToSchema, db };
