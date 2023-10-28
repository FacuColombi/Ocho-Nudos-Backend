import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    username: {type:String, require:true, unique:true},
    password: {type:String, require:true},
    email: {type:String, require:true}
});

usuarioSchema.plugin(mongooseUniqueValidator);

const Usuarios = mongoose.model("users", usuarioSchema);

export default Usuarios;

