const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let waitingList = [];

let tables = [
 {
   customerName: "frank",
   phoneNumber: "123-456-7890",
   customerEmail: "frank@gmail.com",
   customerID: 900
 },
 {
   customerName: "Zarr",
   phoneNumber: "234-567-8901",
   customerEmail: "zarr@gmail.com",
   customerID: 1900
 },
 {
   customerName: "may",
   phoneNumber: "345-678-9012",
   customerEmail: "may@gmail.com",
   customerID: 800
 }
];


app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "view.html"));
});

app.get("/table", (request, response) => {
    response.sendFile(path.join(__dirname, "table.html"));
});

app.get("/reserve", (request, response) => {
    response.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/tables", (request, response) => {
    return response.json(tables);
});

app.get("/api/waitlist", (request, response) => {
    return response.json(waitingList);
});

app.post("/api/tables", (request, response) => {
    let newTable = request.body;
    
    if (tables.length >= 10) {
        waitingList.push(newTable);
    }
    else {
        tables.push(newTable);
    }

    response.sendFile(path.join(__dirname, "add.html"));
});



app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});