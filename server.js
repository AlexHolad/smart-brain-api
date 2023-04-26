import express from "express";
import bcrypt from "bcrypt";
import knex from "knex";

import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleApiCall, handleImage } from "./controllers/image.js";


const db = knex({
  client: "pg",
  connection: {
    host: "",
    user: "",
    password: "",
    database: "",
  },
});

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());

app.get("/", (req, res) => {res.send('success')});
app.post("/signin", handleSignIn(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get("/profile/:id", handleProfileGet(db));
app.put("/image", (req, res) => {handleImage(req, res, db)});
app.post("/imageurl", (req, res) => {handleApiCall(req, res)});


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
