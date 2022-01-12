const fastify = require("fastify")({
  logger: true,
});
const knex = require("./db").knex;
const dayjs = require("dayjs");
//create car
fastify.post("/add-car", (req, reply) => {
  // const cars = [
  //   { name: "Audi's", price: "dajsgdka" },
  //   { name: "Mercedes", price: "asdga" },
  //   { name: "Skoda", price: "hsfsjh" },
  //   { name: "Volvo", price: "asdgajksd" },
  //   { name: "Bentley", price: "ashdja" },
  //   { name: "Bentley", price: "asda" },
  //   { name: "Citroen", price: "asda" },
  //   { name: "Hummer", price: "asd" },
  //   { name: "RoleRoll", price: 100000 },
  //   { name: "BMW", price: "sadqwe" },
  // ];
  const cars = req.body;
  knex
    .insert(cars)
    .from("cars")
    .onConflict("name")
    .ignore() /*merge()*/
    .then((res) => {
      console.log(res);
      reply.send(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

//create bill
fastify.post("/create-bill/:id", (req, reply) => {
  const id = req.params.id;
  const body = {
    carId: id,
    userName: req.body.userName,
    createAt: dayjs(new Date()).format("YYYY-MM-DD"),
  };
  knex
    .insert(body)
    .from("knex-bill")
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});

//get Bill info by Bill Id

fastify.get("/get-bill/:id", (req, reply) => {
  const id = req.params.id; //id of bill
  knex
    .select(
      "knex-bill.id",
      "knex-bill.userName",
      "knex-bill.createAt",
      "cars.name",
      "cars.price"
      // { test: "cars1.name" }
    )
    .from("knex-bill")
    .innerJoin("cars", "knex-bill.carId", "cars.id")
    // .innerJoin("cars1", "knex-bill.id", "cars1.id")
    .where({ "knex-bill.id": id })
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});

//get all Bill by createAt

fastify.put("/bill-in-time", (req, reply) => {
  console.log(req.body);
  const fromTime = req.body?.fromTime
    ? dayjs(req.body.fromTime).format("YYYY-MM-DD")
    : "2022-01-01";
  const toTime = req.body?.toTime
    ? dayjs(req.body.toTime).format("YYYY-MM-DD")
    : dayjs(new Date()).format("YYYY-MM-DD");
  knex
    .select(
      "knex-bill.id",
      "knex-bill.userName",
      "knex-bill.createAt",
      "cars.name",
      "cars.price"
    )
    .from("knex-bill")
    .innerJoin("cars", "knex-bill.carId", "cars.id")
    .whereBetween("knex-bill.createAt", [fromTime, toTime])
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});

//sum of bill in time

fastify.put("/sum-of-bill-in-time", (req, reply) => {
  const fromTime = req.body?.fromTime
    ? dayjs(req.body.fromTime).format("YYYY-MM-DD")
    : "2022-01-01";
  const toTime = req.body?.toTime
    ? dayjs(req.body.toTime).format("YYYY-MM-DD")
    : dayjs(new Date()).format("YYYY-MM-DD");
  knex
    .sum("cars.price", { as: "SumOfBill" })
    .count("knex-bill.id", { as: "CountOfBill" })
    .from("knex-bill")
    .innerJoin("cars", "knex-bill.carId", "cars.id")
    .whereBetween("knex-bill.createAt", [fromTime, toTime])
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});

// update car info
fastify.put("/update/:id", (req, reply) => {
  const id = req.params.id;
  const body = {
    price: req.body.price,
  };
  knex
    .update(body)
    .where({ id })
    .from("cars")
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});
//del car by id
fastify.delete("/del/:id", (req, reply) => {
  const id = req.params.id;
  knex
    .where({ id })
    .from("cars")
    .del()
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});
// get all car
fastify.get("/all-car", (req, reply) => {
  knex
    .from("cars")
    // .having("name", "=", "Audi")
    .orderBy("name")
    // .limit(10)
    // .offset(10)
    .then((res) => reply.send(res))
    .catch((err) => reply.send(err));
});

//search car by name
fastify.put("/search-car", (req, reply) => {
  const text = req.body.searchValue;
  knex
    .select()
    .from("cars")
    .where("name", "like", `%${text}%`)
    .then((res) => {
      reply.send(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
fastify.listen(9000, (err, address) => {
  if (err) {
    fastify.log.error(err);
  }
  console.log(address);
});
