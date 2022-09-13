// Store Mongoose functionality object
const mongoose = require("mongoose");

// NOTE: we model our data here, will have functionality inside of the controllers per schema.
// We are keeping this simple as data, I want to post and view posts as I put them in, maybe reorder in the future.

const PostSchema = new mongoose.Schema(
    {
        postTitle: {
            type: String
        },
        postDesc: {
            type: String
        }
    },
    { timestamps: true }
);

// this saves to db
const Post = mongoose.model("Post", PostSchema);

// exportable, used in controller
module.exports = Post;