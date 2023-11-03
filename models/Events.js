import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    artistName: {type:String, require:true},
    description: {type:String, require:true},
    date: {type:String, require:true},
    hour:{type: String, require: true},
    imgName: {type: String, require: true}
});

eventSchema.plugin(mongooseUniqueValidator);

const Event = mongoose.model("events", eventSchema);

export default Event;

