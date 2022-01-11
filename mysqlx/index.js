const fastify = require("fastify")({
  logger: true,
});
const connectToSchema = require('./db').connectToSchema()
fastify.get("/card", async (req, reply) => {
  const cars = [
    { name: "Audi", price: 52642 },
    { name: "Mercedes", price: 57127 },
    { name: "Skoda", price: 9000 },
    { name: "Volvo", price: 29000 },
    { name: "Bentley", price: 350000, and: "0", test: [{ dibe: 'asdasd' }] },
    { name: "Citroen", price: 21000 },
    { name: "Hummer", price: 41400 },
    { name: "Volkswagen", price: 21600 },
  ];
  const knexSchema = await connectToSchema()
  
  //   .getSession(session)
  //   .then(async (dictSession) => {
  //     const knexSchema = await dictSession.getSchema("knex");
  //     await knexSchema.createCollection("cars2", { reuseExisting: true });
  //     const carsDb = await knexSchema.getCollection("cars2");
  //     carsDb
  //       .add(cars)
  //       .execute()
  //       .then(() => reply.send("done"))
  //       .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));
});
fastify.get("/", (req, reply) => {
  mysqlx
    .getSession(session)
    .then(async (dictSession) => {
      const knexSchema = await dictSession.getSchema("knex");
      return await knexSchema.getCollection("cars2");
    })
    .then(async (carsDb) => {
      await carsDb
        .find('_id = :id').bind('id', '000061d78b870000000000000045')
        .fields()
        .having(`price  > 90000`)
        .execute()
        .then((res) => {
          reply.send(res.toArray());
        });
    });
});
fastify.listen(9001, (err, address) => {
  if (err) {
    fastify.log.error(err);
  }
  console.log(address);
});
