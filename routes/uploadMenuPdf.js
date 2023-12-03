import fs from "fs/promises";
import Event from "../models/Events.js";
import response from "../utils/response.js";

export async function uploadMenuPdf(req, res) {
    try {
        const pdfSize = req?.file?.size;
        const pdfType = req?.body?.type_pdf;
        //Check pdf size less than 10MB
        if(req?.file?.mimetype != "application/pdf") throw new Error(response("Por favor suba un archivo PDF valido", 401, true, req?.file?.path));
        if(!pdfType) throw new Error(response("No existe un tipo de PDF definido", 401, true, req?.file?.path));
        if(!pdfSize || pdfSize > 9888800) throw new Error(response("PDF tiene que pesar menos de 10MB", 401, true, req?.file?.path));

        (pdfType == "MENU") ? await fs.copyFile(req?.file?.path, req?.file?.destination + "Menu/pdfMenu.pdf") : await fs.copyFile(req?.file?.path, req?.file?.destination + "Wine/pdfWine.pdf");
        await deleteFile(req?.file?.path);

        res.status(200).json(response("Pdf agregado correctamente", 200, false, null));
    } catch (e) {
        const error = JSON.parse(e?.message);
        deleteFile(error?.data);
        res.status(error?.code).json(response(error));
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