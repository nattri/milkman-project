var express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./routes/app.routes");
// const connectDB = require("./db.config");
// const cors = require("cors");
var app = express();

// connecting DB
const db = require("./models");
db.mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Error while connecting database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Registering app routes
appRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
