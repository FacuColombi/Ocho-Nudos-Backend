import Booking from "../models/Booking.js";
import response from "../utils/response.js";


// ----------- CREATE NEW BOOKING ----------------
export async function createBooking(req, res) {
    try {
        //Check if fields complete
        if (!req.body?.type || !req.body?.email || !req.body?.fullName || !req.body?.phone || !req.body?.date || !req.body?.qtyPeople) return res.status(400).json(response("Faltan campos", 400, true));
        if (!req.body?.date.includes("-")) return res.status(400).json(response("Formato de fecha incorrecto", 400,  true));

        // Check if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(req.body?.email)) return res.status(400).json(response("Email invalido", 400, true));
        
        if(req.body?.type === "BOOKING"){
            if(!req.body?.hour?.includes(":")) return res.status(400).json(response("Formato de hora incorrecto", 400, true));

            const bookings = await Booking.find({ email: req.body?.email, date: req.body?.date, hour: req.body?.hour, bookingType: req.body?.type });
            if (bookings.length > 0) return res.status(400).json(response("Ya existe una reserva con asociada al mail, dia y hora.", 400, true));
        }else{
            // Validate if there is a booking with the same email and date and time
            const bookings = await Booking.find({ email: req.body?.email, date: req.body?.date, bookingType: req.body?.type });
            if (bookings.length > 0) return res.status(400).json(response("Ya existe una fiesta asociada al mail y al dia.", 400, true));
        }

        let newBooking = {
            bookingType: req.body?.type,
            email: req.body?.email,
            fullName: req.body?.fullName,
            phone: req.body?.phone,
            date: req.body?.date,
            qtyPeople: req.body?.qtyPeople,
            comments: req.body?.comments
        }
        
        if(req.body?.hour) newBooking.hour = req.body?.hour;
        if(req.body?.location) newBooking.location = req.body?.location;

        // Create booking
        const bookingToCreate = new Booking(newBooking);
        const bookCreated = await bookingToCreate.save();
        res.status(201).json(response("Reserva creada correctamente", 201, false, bookCreated));
        
    } catch(error) {
        res.status(500).json(response("Error interno", 500, true, error));
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

