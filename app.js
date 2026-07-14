const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(
  "mongodb://Mahi:mahi123@ac-8zsv7q9-shard-00-00.42ncixy.mongodb.net:27017,ac-8zsv7q9-shard-00-01.42ncixy.mongodb.net:27017,ac-8zsv7q9-shard-00-02.42ncixy.mongodb.net:27017/?ssl=true&replicaSet=atlas-la32m9-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Test API
app.get("/test", (req, res) => {
    res.send("Hello");
});


const Volunteer = mongoose.model(
    "Volunteers",
    new mongoose.Schema({
        volunteer_id: String,
        full_name: String,
        email: String,
        phone: String,
        date_of_birth: String,
        gender: String,
        blood_group: String,
        department: String,
        year_of_study: String,
        camp_name: String,
        hours_completed: Number,
        address: String,
        unit_number: String
    })
);


app.post("/api/add-volunteer", async (req, res) => {
    try {

        const volunteer = new Volunteer(req.body);
        const result = await volunteer.save();

        res.status(201).json({
            status: "success",
            message: "Volunteer Added Successfully",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            status: "failed",
            message: error.message
        });

    }
});


app.listen(3000, () => {
    console.log("Server Started");
});