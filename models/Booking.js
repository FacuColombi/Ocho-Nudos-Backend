import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    fullName: {type:String, require:true},
    email: {type:String, require:true},
    phone: {type:String, require:true},
    qtyPeople: {type:Number, require:true},
    hour: {type:String, require:true},
    date: {type:String, require:true},
    comments: {type: String}
});

bookingSchema.plugin(mongooseUniqueValidator);

const Bookings = mongoose.model("bookings", bookingSchema);

export default Bookings;

