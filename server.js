/** PSUEDO outline prior to proceeding:
 *  
 * Establishing our backend - database connection, routing. 
 * -- Step 1 -- after config.js file is setup -- 
 * Import Express
 * Import CORS - Cross Origin Resource Sharing
 * Create an instance of express object for functionality.
 * Declare specific port for our backend.
 * 
 * -- Step 2 -- Make use of our express instance --
 * Handling POST req/req, parsing form and using Middleware.
 * - app.use(express.json()) - Lets our app convert form into json.
 * - app.use(express.urlencoded({ extended: true })) - Lets our app parse form information.
 * - app.use(cors()) - Enables cors so that we can share resources in our full stack application.
 * 
 * -- Step 3 -- Create routes and establish connection with Mongoose / MongoDb credentials
 */


// BONUS: Import deconstructing from dotenv and invoking dotenv.
const { config } = require('dotenv');
config();

// -- Step 1 --
const express = require("express");
const cors = require("cors");
const app = express();
// DOTENV port information
const port = process.env.port;

// -- Step 2 -- Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// -- Step 3 -- Routing / Endpoints
// Routes, accessing our routes.
const AllMyPostRoutes = require('./server/routes/post.routes');
AllMyPostRoutes(app);

// same thing
// require("./server/routes/blog.routes")(app);


/* 
* Connection to DB, if error, check on correct file structures and file nomenclature.
* For React18 + MongoDB Cloud (Backend). Also notice, when using DOTENV, the ending if ();
* This is needed for establishing our connection securely from the original way
* require("./server/config/mongoose.config");
*/
require('./server/config/mongoose.config')();


// Custom response on connection to our backend
app.listen(port, () => console.log(`Listening on port: ${port}`));