const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index.routes");
const database = require("./config/db");
const cors = require("cors");
const Property = require("./models/property.model")

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

database.connect();
database.sync().then(async () => {
    const count = await Property.model.count();

    if(count === 0){
        const response = await Property.setDataInit();

        console.log(`Se insertaron correctamente ${response} propiedades`)
    }
});

const port = 3003;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
