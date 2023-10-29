import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import  {loginUser, registerUser}  from "./routes/users.js";
import { createBooking } from "./routes/bookings.js";



const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App corrinedo en puerto ${port}`);
})

// ------------------- ROUTES ------------------- //
app.get("/", (req, res) => {
    res.send("hello word");
});

// ------------------- USERS ------------------- //
app.post("/users/login", loginUser);

app.post("/users/register", registerUser);

app.post("/bookings/create", createBooking);