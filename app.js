const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index.routes");
const database = require("./config/db");
const cors = require("cors");
const Init = require("./utils/init-data");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);

database.connect();
database.sync().then(async () => {
  const response = await Init.initProperties();
  if (response) {
    await Init.initBricks();
    await Init.initUser();
  }
});

const port = 3003;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
