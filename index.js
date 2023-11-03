import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import bodyParser from "body-parser";
import multer from "multer";
import { login, register } from "./routes/users.js";
import { createBooking, getBookings, changeStatus } from "./routes/bookings.js";
import { createNewEvent, getAllEvents, deleteEvent, updateEvent } from "./routes/events.js";
import { storage } from "./utils/storageMulter.js";



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
app.post("/users/login", login);
app.post("/users/register", register);

// ------------------- BOOKINGS ------------------- //
app.get("/bookings", getBookings);
app.post("/bookings", createBooking);
app.put("/bookings", changeStatus);

// ------------------- EVENTS ------------------- //
const upload = multer({ storage: storage });
app.get("/events", getAllEvents);
app.post("/events", upload.single('event_img'), createNewEvent);
app.put("/events", updateEvent);
app.delete("/events", deleteEvent);