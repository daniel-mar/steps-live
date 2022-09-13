// controller will grab schema from the model
// Meaning we have a post name and 
const Post = require('../models/post.model');

module.exports.sayHello = (req, res) => {
    res.json({msg: "did this connect and say hello"})
}

// Find ALL posts
module.exports.findAllPosts = (req, res) => {
    Post.find()
        .then(allPosts => {
            res.json({ results: allPosts })
        })
        .catch(err => {
            res.json({ msg: "something went wrong finding posts", error: err})
        })
}

// Create a post
// Validate if post title exists already
module.exports.createPost = (req, res) => {
    Post.exists({ postTitle: req.body.postTitle })
        .then(postExists => {
            if(postExists) {
                // the promise .reject activates the .catch that occurs after outside a layer of the scope.
                return Promise.reject("Post found in database")
            } return Post.create(req.body);
        })
        .then(saveResult => res.json(saveResult))
        .catch(err => res.json(err));
}

// Find one post
// To be used in an edit post page
module.exports.findOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(foundPost => {
            res.json({ results: foundPost })
        })
        .catch(err => {
            res.json({ msg: "err finding one", error: err})
        })
}

// Update a post
// Submitting the editted post
module.exports.updatePost = (req, res) => {
    Post.findByIdAndUpdate({ _id: req.params.id },
        req.body,
        { new: true, runValidators: true})
            .then(updatePost => {
                res.json({ results: updatePost })
            })
            .catch(err => {
                res.json({ msg: "something went wrong during the update", error: err})
            })
}

// Delete a post
// I am practicing CRUD app development
module.exports.deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(deletePost => {
            res.json({ results: deletePost })
        })
        .catch(err => {
            res.json({ msg: "something wrong in deletion", error: err})
        })
}