//create cars api using express
const express = require('express');
const {app}=require('@azure/functions');
const app = express();



app.use(express.json());

const cars = require('./cars.json');
const fs = require('fs');
 app.http('cars',{
    methods:['GET'],
    authlevel:'anonymous',
    handler: async (context,req)=>{
        return{
            status:200,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(cars)
            }
        }
 });

 app.http('addCar',{
    methods:['POST'],
    authlevel:'anonymous',
    handler: async (context,req)=>{
         newCar = await req.json();
        // Read the cars.json file
        const carData = fs.readFileSync('./cars.json');
        const cars = JSON.parse(carData);

        // Add the new car to the array
        cars.push(newCar);

        // Write the updated array back to the cars.json file
        fs.writeFileSync('./cars.json', JSON.stringify(cars));

        return{
            status:200,
            body:"new car added"
            }
        }
 });
//get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

//get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

//update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/cars', (req, res) => {
    console.log(req);
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);
    res.json(newCar);
});

//start app at localhost:3001
app.listen(3001, () => {
    console.log('Server started at http://localhost:3001');
});
