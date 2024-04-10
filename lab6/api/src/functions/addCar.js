// addCar.js
module.exports = async function (context, req) {
    const fs = require('fs');
    const newCar = req.body;

    const carData = fs.readFileSync('./cars.json');
    const cars = JSON.parse(carData);

    cars.push(newCar);

    fs.writeFileSync('./cars.json', JSON.stringify(cars));

    context.res = {
        status: 200,
        body: "new car added"
    };
}