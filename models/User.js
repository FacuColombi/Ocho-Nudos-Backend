import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {type:String, require:true},
    password: {type:String, require:true},
    email: {type:String, require:true, unique:true},
    role:{type: String, enum: ['customer', 'admin'], default: 'customer'},
});

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("users", userSchema);

export default User;

