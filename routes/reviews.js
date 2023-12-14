import fs from "fs/promises";
import Review from "../models/Reviews.js";
import response from "../utils/response.js";


export async function getReviews(req, res) {
    try{
        const reviews = await Review.find();
        res.status(200).json(response("Reviews obtenidas", 200, false, reviews));
    }catch(e){
        res.status(500).json(response("Error al obtener las reviews", 500, true));
    }
}