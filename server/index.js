const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors =require ("cors");

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"Hlengiwe@01",
    database: "devices"
});

app.use(cors());//middle wears execute incomingv and outgoing requests
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000, () =>{
    console.log("server is running on port 5000")
})

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM devices_table";
    db.query(sqlGet, (error, results) => {
        res.send(results)

    });
});

app.post("/api/create", (req, res) => {
    const { CityID, SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude } = req.body;
    const sqlInsert = "INSERT INTO devices_table (CityID,SerialNumber,Description,SmartWeatherEnabled,Latitude,Longitude) Values (?,?,?,?,?,?)";

    db.query(sqlInsert, [CityID, SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude], (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})
app.put("/api/update", (req, res) => {
    const { CityID, SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude } = req.body;
    const sqlUpdate = `UPDATE devices_table
    SET 
    CityID = , 
    SerialNumber = , 
    Description = , 
    SmartWeatherEnabled = , 
    Latitude = , 
    Longitude = 
    WHERE condition;`;
    
    db.query(sqlUpdate, [
            CityID, 
            SerialNumber, 
            Description, 
            SmartWeatherEnabled, 
            Latitude, 
            Longitude
        ], (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})
