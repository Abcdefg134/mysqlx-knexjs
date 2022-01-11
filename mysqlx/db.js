const { default: mysqlx } = require("mysqlx");

const session = {
  host: "localhost",
  port: 33060,
  user: "root",
  password: "123456",
};

const connectToSchema =async ()=>{
  let dictSession
  let knexSchema
  try {
    dictSession = await mysqlx.getSession(session)
    try {
      knexSchema = await dictSession.getSchema('knex')
    } catch (error) {
      console.log(error);
    } finally {
      return  knexSchema
    }
  } catch (error) {
    console.log(err);
  } 
}


module.exports = { connectToSchema };
