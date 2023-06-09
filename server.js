import express from "express";
import cors from 'cors'
import bcrypt from "bcrypt";
import knex from "knex";

import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleApiCall, handleImage } from "./controllers/image.js";


const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5432,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
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
