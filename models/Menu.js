import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    menuType: {type:String, enum:['MENUS', 'WINES' ], require: true},
    locationPdf: {type: String, require: true}
});

menuSchema.plugin(mongooseUniqueValidator);

const Menus = mongoose.model("menus", menuSchema);

export default Menus;