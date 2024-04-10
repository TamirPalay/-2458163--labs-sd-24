// getAllCars.js
module.exports = async function (context, req) {
    const fs = require('fs');
    const carData = fs.readFileSync('./cars.json');
    const cars = JSON.parse(carData);

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: cars
    };
}