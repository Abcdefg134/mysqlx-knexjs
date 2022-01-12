const fastify = require("fastify")({
  logger: true,
});
const dayjs = require("dayjs");
const connectToSchema = require("./db").connectToSchema;
const db = require("./db").db;
fastify.post("/add-car", async (req, reply) => {
  const body = req.body
  // [
  //   { name: "Audi", price: 52642 },
  //   { name: "Mercedes", price: 57127 },
  //   { name: "Skoda", price: 9000 },
  //   { name: "Volvo", price: 29000 },
  //   { name: "Bentley", price: 35000 },
  //   { name: "Citroen", price: 21000 },
  //   { name: "Hummer", price: 41400 },
  //   { name: "Volkswagen", price: 21600 },
  // ];
  const data = Array.isArray(body)?body.map((value) => [value.name, value.price]):[Object.values(body)];
  console.log(data);
  const knexSchema = await connectToSchema();
  const carsDb = knexSchema.getTable("cars1");
  try {
    await data.map((value) =>
      carsDb.insert(["name", "price"]).values(value).execute()
    );
    reply.send("done");
  } catch (error) {
    reply.send(error);
  }
});

//find car by name
fastify.put("/search-car", async (req, reply) => {
  const knexSchema = await connectToSchema();
  const carsDb = knexSchema.getTable("cars1");
  const name = req.body.name
  let dataResponse;
  //console.log(100,carsDb.select().xTableSelect);
  try {
    console.log(1000,carsDb.select());
    dataResponse = await carsDb
      .select()
      //.select("id")
      .xTableSelect.where("name like :name") // Nếu bỏ 'XTableSelect' thì trả về lỗi select().where... is not function và fetchAll() không tồn tại mà thay bằng getRows()
      // .where('name like :name && id = :id')
      .bind("name", name)
      // .bind("id", 2)
      .execute();
    reply.send(dataResponse.fetchAll());
  } catch (error) {
    reply.send(error);
  }
});
// get all car
fastify.get("/all-car", async (req, reply) => {
  const knexSchema = await connectToSchema();
  const carsDb = knexSchema.getTable("cars1");
  let dataResponse;
  try {
    dataResponse = await carsDb.select().xTableSelect.execute();
    reply.send(dataResponse.fetchAll());
  } catch (error) {
    reply.send(error);
  }
});

// del car
fastify.delete("/del/:id", async (req, reply) => {
  const id = req.params.id;
  const knexSchema = await connectToSchema();
  const carsDb = knexSchema.getTable("cars1");
  try {
    console.log(100, carsDb.delete().xTableDelete);
    //await carsDb.delete().where("id = :id").bind("id", id).execute();
    await carsDb
      .delete()
      .xTableDelete.where("id = :id") // Bỏ 'xTableDelete' thì trả về lỗi delete().where... is not function
      .bind("id", id)
      .execute();
    reply.send("delee");
  } catch (error) {
    reply.send(error);
  }
});

// update car info
fastify.put("/update/:id", async (req, reply) => {
  const id = req.params.id;
  const knexSchema = await connectToSchema();
  const carsDb = knexSchema.getTable("cars1");
  const body = req.body
  console.log(body.name);
  try {
    await carsDb.xTable 
      .update()
      .set("name",body.name )
      .set("price",body.price)
      .where("id = :id")
      .bind("id", id)
      .execute();
    reply.send("done");
  } catch (error) {
    reply.send(error);
  }
});

// create bill
fastify.post("/create-bill/:id", async (req, reply) => {
  const id = req.params.id;
  const knexSchema = await connectToSchema();
  const billDb = knexSchema.getTable("mysqlxBill");
  const body = [id, req.body.userName, dayjs(new Date()).format("YYYY-MM-DD")];
  try {
    await billDb
      .insert(["carId", "userName", "createAt"])
      .values(body)
      .execute();
    reply.send("create bill success");
  } catch (error) {
    reply.send(error);
  }
});

//get bill info by Id
fastify.get("/get-bill/:id", async (req, reply) => {
  const id = req.params.id;
  const dictSession = await db();
  const queryString = `SELECT mysqlxBill.id,mysqlxBill.userName,mysqlxBill.createAt,cars1.name,cars1.price FROM mysqlxBill INNER JOIN cars1 ON mysqlxBill.carId = cars1.id WHERE mysqlxBill.id = ?   `;
  let dataResponse; 
  try {
    dataResponse = await dictSession.sql(queryString).bind(id).xSqlExecute.execute();
    console.log(await dictSession.sql(queryString).bind(id).xSqlExecute.execute()); // Nếu không có 'xSqlExecute' thì không tồn tại fetchAll() và trả về data có kèm metada:
    // {
    //   getCharacterSetName: [Function: getCharacterSetName],
    //   getCollationName: [Function: getCollationName],
    //   getColumnLabel: [Function: getColumnLabel],
    //   getColumnName: [Function: getColumnName],
    //   getFractionalDigits: [Function: getFractionalDigits],
    //   getLength: [Function: getLength],
    //   getSchemaName: [Function: getSchemaName],
    //   getTableLabel: [Function: getTableLabel],
    //   getTableName: [Function: getTableName],
    //   getType: [Function: getType],
    //   isNumberSigned: [Function: isNumberSigned],
    //   isPadded: [Function: isPadded]
    // }
    reply.send(dataResponse.fetchAll());
  } catch (error) {
    reply.send(error);
  }
});

//get all Bill in Time

fastify.put('/bill-in-time',async(req,reply)=>{
  const fromTime = req.body.fromTime
    ? dayjs(req.body.fromTime).format("YYYY-MM-DD")
    : "2022-01-01";
  const toTime = req.body.toTime
    ? dayjs(req.body.toTime).format("YYYY-MM-DD")
    : dayjs(new Date()).format("YYYY-MM-DD");
  console.log(fromTime,toTime);
  const dictSession = await db()
  const queryString = `SELECT mysqlxBill.id,mysqlxBill.userName,mysqlxBill.createAt,cars1.name,cars1.price FROM mysqlxBill INNER JOIN cars1 ON mysqlxBill.carId = cars1.id WHERE  mysqlxBill.createAt BETWEEN ? AND ? `
  let dataResponse
  try {
    dataResponse = await dictSession.sql(queryString).bind(fromTime,toTime).xSqlExecute.execute()
    reply.send(dataResponse.fetchAll())
  } catch (error) {
    
  }
})

//sum of bill in time

fastify.put('/sum-of-bill-in-time',async(req,reply)=>{
  const fromTime = req.body?.fromTime
    ? dayjs(req.body.fromTime).format("YYYY-MM-DD")
    : "2022-01-01";
  const toTime = req.body?.toTime
    ? dayjs(req.body.toTime).format("YYYY-MM-DD")
    : dayjs(new Date()).format("YYYY-MM-DD");
  const dictSession = await db()
  const queryString = `SELECT SUM(cars1.price) as SumOfBill, COUNT(mysqlxBill.id) as CountOfBill FROM mysqlxBill INNER JOIN cars1 ON mysqlxBill.carId = cars1.id WHERE mysqlxBill.createAt BETWEEN ? AND ?`
  let dataResponse
  try {
    dataResponse = await dictSession.sql(queryString).bind(fromTime,toTime).xSqlExecute.execute()
    reply.send(dataResponse.fetchAll())
  } catch (error) {
    reply.send(error)
  }
})

fastify.listen(9001, (err, address) => {
  if (err) {
    fastify.log.error(err);
  }
  console.log(address);
});
