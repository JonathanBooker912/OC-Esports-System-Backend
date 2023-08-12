require("dotenv").config();

const express = require("express");
const cors = require("cors");
var alterDB = false;

/* This allows you to run the "alter" command from the command line*/
const args = process.argv.slice(2);
if (args[0] === "alter") {
  console.log("NOTICE: Altering Database Tables");
  alterDB = true;
}

const app = express();

const db = require("./app/models");
db.sequelize.sync({ alter: alterDB });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/title.routes")(app);
require("./app/routes/alias.routes.js")(app);
require("./app/routes/emergencyContact.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
