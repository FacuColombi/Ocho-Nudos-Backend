import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    message: {type:String, require:true},
    username: {type:String, require:true},
    rating: {type:Number, require:true},
});

reviewSchema.plugin(mongooseUniqueValidator);

const Review = mongoose.model("reviews", reviewSchema);

export default Review;

