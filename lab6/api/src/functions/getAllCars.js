const { app } = require('@azure/functions');

app.http('getCars', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        //parse cars.json file into a variable
        const fs = require('fs');
        const carData = fs.readFileSync('./cars.json');
        const cars = JSON.parse(carData);
        //return the cars array as a JSON response
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cars)
        };
    }
});
