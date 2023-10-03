import "dotenv/config";
import express, { json, urlencoded } from "express";
import SequelizeInstance from "./app/sequelizeUtils/sequelizeInstance.js";
import routes from "./app/routes/index.js";
import cors from "cors";
var alterDB = false;

/* This allows you to run the "alter" command from the command line*/
const args = process.argv.slice(2);
if (args[0] === "alter") {
  console.log("NOTICE: Altering Database Tables");
  alterDB = true;
}

const app = express();

SequelizeInstance.sync({ alter: alterDB });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/EsportsAPI", routes); // Load the routes from the routes folder

// set port, listen for requests
const PORT = process.env.PORT || 3100;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

export default app;
