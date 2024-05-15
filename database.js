// Get the client
const mysql = require("mysql2");
// Create the connection to database
const database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "express_intro",
});
database.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Terhubung ke database dengan ID ` + database.threadId);
});
module.exports = database;
