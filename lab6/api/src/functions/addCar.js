const { app } = require('@azure/functions');

app.http('addCar', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
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

