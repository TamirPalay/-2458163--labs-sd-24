const { app } = require('@azure/functions');

app.http('getCarById', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'cars/{carID}',
    handler: async (context, req) => {
        const carId = req.params.carID;
        const fs = require('fs');
        const carData = fs.readFileSync('./cars.json');
        const cars = JSON.parse(carData);
        const updatedCars = cars.filter(car => car.id !== carId);
        fs.writeFileSync('./cars.json', JSON.stringify(updatedCars));
        return {
            status: 200,
            body: 'Car deleted'
        };
    }
});
