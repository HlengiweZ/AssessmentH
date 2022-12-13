const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors =require ("cors");
const axios = require("axios");

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"Hlengiwe@01",
    database: "devices"
});

app.use(cors());//middle wears execute incoming and outgoing requests
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(5000, () =>{
    console.log("server is running on port 5000")
})



app.get("/api/get", (req, res) => { //executed my select statement to get all the information from the devices table
    const sqlGet = "SELECT * FROM devices_table";
    db.query(sqlGet, (error, results) => {
        if(error) console.log(error);
        res.send(results)
    });
});

app.post("/api/create",async (req, res) => { //insert statement
    const { SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude } = req.body;
    let CityID = Math.floor(1000 + Math.random() * 9000); // generate 4 digit random number
    if (SmartWeatherEnabled) {
        const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=fSLx4bxM2WEhJMktEVxDQxnfWN2IsAfQ&q=${Latitude},${Longitude}`;
        
        try {
            const city = await axios.get(url)
            if(city.data) {
                // convert city Key from api to number because it was a string on response
                CityID = parseInt(city.data.Key)
            }
        } catch (e) { 
            res.status(404).send(`Internal Server Error: ${e}`)
            console.error(e)
            return;
        }
    }




    const sqlInsert = "INSERT INTO devices_table (CityID,SerialNumber,Description,SmartWeatherEnabled,Latitude,Longitude) Values (?,?,?,?,?,?)";

    db.query(sqlInsert, [CityID, SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude], (error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        } 
        res.send("created successfully");
    })

})

app.put("/api/update", (req, res) => { //to update the table by serialNO
    const { SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude } = req.body;
    const sqlUpdate = `UPDATE
        devices_table SET
            SerialNumber = '${SerialNumber}',
            Description = '${Description}',
            SmartWeatherEnabled = ${SmartWeatherEnabled},
            Latitude = ${Latitude},
            Longitude = ${Longitude}
            WHERE SerialNumber = '${SerialNumber}';`;

    db.query(sqlUpdate, [
            SerialNumber,
            Description,
            SmartWeatherEnabled,
            Latitude,
            Longitude
    ], (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
    })

    res.send('updated')
})

app.delete("/api/delete/:id", (req, res) => { //Sql statement to delete by serial number
    const { id } = req.params;
    const sqlUpdate = `DELETE FROM devices_table WHERE SerialNumber = '${id}'`;

    db.query(sqlUpdate, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
    })

    res.send('Deleted')
})
