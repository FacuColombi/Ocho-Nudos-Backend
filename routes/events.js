import fs from "fs/promises";
import Event from "../models/Events.js";
import response from "../utils/response.js";


export async function getAllEvents(req, res) {
    try{
        const events = await Event.find();
        res.status(200).json(response("Eventos obtenidos", 200, false, events));
    }catch(e){
        res.status(500).json(response("Error al obtener los eventos", 500, true));
    }
}



export async function createNewEvent(req, res) {
    try {
        // Check if fields complete
        if (!req.body?.name || !req.body?.desc || !req.body?.date || !req.body?.hour || !req?.file?.originalname) throw new Error(response("Faltan campos", 400, true, req?.file?.path));
        if (req.body?.date.split("-").length != 3) throw new Error(response("Formato de fecha incorrecto", 400, true, req?.file?.path));
        if (!req.body?.hour.includes(":")) throw new Error(response("Formato de hora incorrecto", 400, true, req?.file?.path));

        const events = await Event.find({ date: req.body.date, hour: req.body.hour });
        if (events?.length > 0) throw new Error(response("Ya existe un evento en esa fecha y hora", 400, true, req?.file?.path));

        const newEvent = new Event({
            artistName: req.body.name,
            description: req.body.desc,
            date: req.body.date,
            hour: req.body.hour,
            imgName: req.file.path
        })

        let eventCreated = await newEvent.save();

        res.status(201).json(response("Evento creado", 201,  false, eventCreated));

    } catch (e) {
        const error = JSON.parse(e?.message || {});

        // Delete picture upload if exist
        deleteFile(error?.data);

        res.status(error?.code).json(error);
    }
}



export async function updateEvent(req, res) {
    try {
        // Check if fields complete
        if (!req.body?.id || !req.body?.name || !req.body?.desc || !req.body?.date || !req.body?.hour) throw new Error(response("Faltan campos", 400, true));
        if (req.body?.date.split("-").length != 3) throw new Error(response("Formato de fecha incorrecto", 400, true));
        if (!req.body?.hour.includes(":")) throw new Error(response("Formato de hora incorrecto", 400, true));

        const events = await Event.find({ date: req.body.date, hour: req.body.hour });
        if (events?.length > 0) throw new Error(response("Ya existe un evento en esa fecha y hora", 400, true));

        let event = await Event.findById(req.body.id);
        if (!event) throw new Error(response("Evento no encontrado", 404, true, req?.file?.path));

        event.artistName = req.body.name;
        event.description = req.body.desc;
        event.date = req.body.date;
        event.hour = req.body.hour;
        event.imgName = req.file.path;

        let eventUpdated = await event.save();

        res.status(201).json(response("Evento actualizado", false, eventUpdated));

    } catch (e) {
        res.status(error?.code).json(e?.message);
    }
}



export async function deleteEvent(req, res) {

    try {

        const event = await Event.findById(req.body?.id);
        if (!event) throw new Error(response("Evento no encontrado", 404, true));

        // Delete picture
        deleteFile(event?.path);

        await event.deleteOne();

        res.status(200).json(response("Evento eliminado", 200, false));

    }catch(e){
        res.status(500).json(response("Error al eliminar el evento", 500, true));
    }
}




// ----------------AUXILIAR FUNCTIONS----------------
async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        return `File ${filePath} has been deleted.`;
    } catch (err) {
        return err;
    }
}