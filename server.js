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
   name: "frank",
   phoneNum: "123-4567",
   email: "frank@gmail.com",
   id: 900
 },
 {
   name: "Zarr",
   phoneNum: "234-4567",
   email: "zarr@gmail.com",
   id: 1900
 },
 {
   name: "may",
   phoneNum: "345-4567",
   email: "may@gmail.com",
   id: 800
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
    
    if (tables.length >= 5) {
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