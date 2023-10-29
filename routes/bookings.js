import Booking from "../models/Booking.js";
import response from "../utils/response.js";

export async function createBooking(req, res) {
    try {
        //Check if fields complete
        if (!req.body?.email || !req.body?.fullName || !req.body?.phone || !req.body?.date || !req.body?.hour || !req.body?.qtyPeople) return res.status(400).json(response("Faltan campos", true));
        if (!req.body?.date.includes("-")) return res.status(400).json(response("Formato de fecha incorrecto", true));
        if (!req.body?.hour.includes(":")) return res.status(400).json(response("Formato de hora incorrecto", true));
        

        // Check if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(req.body?.email)) return res.status(400).json(response("Email invalido", true));

        // Validate if there is a booking with the same email and date and time
        const bookings = await Booking.find({ email: req.body?.email, date: req.body?.date, hour: req.body?.hour });
        if (bookings.length > 0) return res.status(400).json(response("Ya existe una reserva con ese email, fecha y hora", true));


        // Create booking
        const newBooking = new Booking({
            email: req.body?.email,
            fullName: req.body?.fullName,
            phone: req.body?.phone,
            date: req.body?.date,
            hour: req.body?.hour,
            qtyPeople: req.body?.qtyPeople,
            comments: req.body?.comments
        });
        const bookCreated = await newBooking.save();
        res.status(201).json(response("Reserva creada correctamente", false, bookCreated));
        
    } catch(error) {
        res.status(500).json(response("Error interno", true, error));
    }
} 