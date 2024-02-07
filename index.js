import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import cors from "cors";
import { login, register } from "./routes/users.js";
import { createBooking, getBookings, changeStatus } from "./routes/bookings.js";
import { createNewEvent, getAllEvents, deleteEvent, updateEvent } from "./routes/events.js";
import { storage, storagePdf } from "./utils/storageMulter.js";
import { uploadMenuPdf } from "./routes/uploadMenuPdf.js";
import { getReviews } from "./routes/reviews.js";


const app = express();
app.use(cors({
    origin: 'https://ocho-nudos-backend.onrender.com'
}));
app.use(express.json());
app.use("/public",express.static('./public/'));
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
// ------------------ MENUS PDF ----------------- //
const uploadPdf = multer({storage: storagePdf});
app.post("/upload/pdf", uploadPdf.single("menu_pdf"), uploadMenuPdf);
// ------------------ REVIEWS ----------------- //
app.get("/reviews", getReviews);