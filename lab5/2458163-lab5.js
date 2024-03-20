//program to create a RESTful API for managing a collection of cars and their specifications
const bodyp=require('body-parser');
const express = require('express');
const app = express ();
 app.use(express.json());
//app.use(bodyp.json());
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
  // const { DataTypes } = require("sequelize");

  //cars have unique id a make,model,year,color and engineType
  /*const carModel = sequelize.define("Car", {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      make: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      model: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      year: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      color: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      engineType: {
          type: DataTypes.STRING,
          allowNull: true,
      },
  });*/
   let carList=[];
  const car1={
    id:1,
    make:"Toyota",
    model:"Corolla"
  }
  const car2={
    id:2,
    make:"Toyota",
    model:"Camri"
  }
  carList.push(car1);
  carList.push(car2);
  app.get('/cars', (req, res) => {
    try {
      res.json(carList);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/cars/:id', (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const car = carList.find(car => car.id == carId);
      if (car) {
        res.json(car);
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // POST request to add a new car to the collection
  app.post('/cars', (req, res) => {
    try {
      const newCar = {
        id: carList.length + 1,
        make: req.body.make,
        model: req.body.model
      };
      carList.push(newCar);
      res.status(201).json({ message: 'Car added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.put('/cars/:id', (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const carIndex = carList.findIndex(car => car.id === carId);
      if (carIndex !== -1) {
        carList[carIndex].make = req.body.make;
        carList[carIndex].model = req.body.model;
        res.json({ message: 'Car updated successfully' });
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.delete('/cars/:id', (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const carIndex = carList.findIndex(car => car.id === carId);
      if (carIndex !== -1) {
        carList.splice(carIndex, 1);
        res.json({ message: 'Car deleted successfully' });
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.put('/cars/:id/specification', (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const car = carList.find(car => car.id === carId);
      if (car) {
        car.engineType = req.body.engineType;
        car.color = req.body.color;
        car.year = req.body.year;
        res.json({ message: 'Car specification updated successfully' });
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.delete('/cars/:id/specification', (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const car = carList.find(car => car.id === carId);
      if (car) {
        car.engineType = null;
        car.color = null;
        car.year = null;
        res.json({ message: 'Car specifications removed successfully' });
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  