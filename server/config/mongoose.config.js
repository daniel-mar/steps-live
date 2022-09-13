// Securing our connection to database + using destructuring.
const { connect } = require('mongoose');
const { config } = require('dotenv');

/* The following is bonus: we are securing credentials from end-users.
* module.exports to import file in our server for secure communication
* between the front-end and back-end.
*
* Will use mongoDB as my cloud database for limited CRUD operations + practice.
* this allows for the db to be hosted separately from my deployed website.
*/

// connection to db is exportable and usable in server.js
module.exports = () => {

    // Invoke dotenv config availability of variables
    config();

    // Establish our uri with dotenv
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dclstor.vddhv.mongodb.net/test`;

    /* Passing two parameters ('connection_string', {options});
    * Our creds or db info are passed as options rather than within our connection string.
    * We also removed deprecated options of useFindAndModify + useCreateIndex, etc.
    * Our connect method returns a PROMISE, so we use .then(), .catch()
    */

    connect(uri, {
        dbName: process.env.DB_NAME,
    })
        .then(() => {
            console.log('Connection to DB Established');
        })
        .catch(error => console.error(error.message));

}