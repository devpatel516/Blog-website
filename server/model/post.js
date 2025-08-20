import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: [String],  
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now  
    }
});


const Post = mongoose.model("Post", postSchema);

export default Post;
