import Booking from "../models/Booking.js";
import response from "../utils/response.js";


// ----------- CREATE NEW BOOKING ----------------
export async function createBooking(req, res) {
    try {
        //Check if fields complete
        if (!req.body?.type || !req.body?.email || !req.body?.fullName || !req.body?.phone || !req.body?.date || !req.body?.hour || !req.body?.qtyPeople) return res.status(400).json(response("Faltan campos", true));
        if (!req.body?.date.includes("-")) return res.status(400).json(response("Formato de fecha incorrecto", true));
        if (!req.body?.hour.includes(":")) return res.status(400).json(response("Formato de hora incorrecto", true));
        

        // Check if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(req.body?.email)) return res.status(400).json(response("Email invalido", true));

        // Validate if there is a booking with the same email and date and time
        const bookings = await Booking.find({ email: req.body?.email, date: req.body?.date, hour: req.body?.hour });
        if (bookings.length > 0) return res.status(400).json(response("Ya existe una reserva con ese email, fecha y hora", true));

        let newBooking = {
            bookingType: req.body?.type,
            email: req.body?.email,
            fullName: req.body?.fullName,
            phone: req.body?.phone,
            date: req.body?.date,
            hour: req.body?.hour,
            qtyPeople: req.body?.qtyPeople,
            comments: req.body?.comments
        }
        
        // If location is present it means that the booking is for a party
        if(req.body?.location) newBooking.location = req.body?.location;

        // Create booking
        const bookingToCreate = new Booking(newBooking);
        const bookCreated = await bookingToCreate.save();
        res.status(201).json(response("Reserva creada correctamente", false, bookCreated));
        
    } catch(error) {
        res.status(500).json(response("Error interno", true, error));
    }
}


// ----------- GET BOOKING ----------------
export async function getBookings(req, res) {
    try {
        const types = ["PARTY", "BOOKING"];
        if(!types.includes(req.query?.type)) return res.status(400).json(response("Tipo de reserva invalido", true));

        const bookings = await Booking.find({bookingType: req.query?.type});
        res.status(201).json(response("Reservas obtenidas", false, bookings));
    } catch(error) {
        res.status(500).json(response("Error al traer reservas", true, error));
    }
}

export async function changeStatus(req, res){
    try{

        const status = ["PENDING", "CONFIRMED", "CANCELLED"];
        if(!status.includes(req.body?.status)) return res.status(400).json(response("Estado invalido", true));

        //select booking to change status
        const statusChanged = await Booking.findByIdAndUpdate(req.body?.id, {status: req.body?.status});
        if(!statusChanged) return res.status(404).json(response("No se pudo actualizar la reserva", true));

        res.status(201).json(response("Estado de reserva actualizado", false, statusChanged));
        
    }catch(error){
        res.status(500).json(response("Error al cambiar el estado de la reserva", true, error));
    }
}

