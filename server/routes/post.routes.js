const PostController = require("../controllers/post.controller")

module.exports = (app) => {

    // routes that will go towards the controller to query the database accordingly with the server.js

    // find all posts
    app.get("/api/posts", PostController.findAllPosts);

    // create a post
    app.post("/api/posts", PostController.createPost);

    // find a post
    app.get("/api/posts/:id", PostController.findOnePost);

    // update a post
    app.put("/api/posts/:id", PostController.updatePost)

    // delete a post
    app.delete("/api/posts/:id", PostController.deletePost);
}