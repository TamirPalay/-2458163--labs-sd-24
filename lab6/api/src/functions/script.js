document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');
    let cars = [];
    loadCarsBtn.addEventListener('click', () => {
        fetch('/api/src/functions/getAllCars.js')
            .then(response => response.json())
            .then(data => {
                cars = data;
                carList.innerHTML = '';
                data.forEach((car, index) => {
                    const carCard = document.createElement('div');
                    carCard.classList.add('car-card');
                    carCard.innerHTML = `
                        <h2>${car.make} ${car.model}</h2>
                        <p><strong>Year:</strong> ${car.year}</p>
                        <p><strong>Make:</strong> ${car.make}</p>
                        <p><strong>Model:</strong> ${car.model}</p>
                        <p><strong>Price:</strong> R${car.price}</p>
                        <button class="btn btn-remove" data-index="${index}">Remove</button>
                    `;
                    carList.appendChild(carCard);
                });
            })
            .catch(error => {
                console.error('Error fetching car data:', error);
            });
            console.log('Success:', data);
            //reload cars
            // const loadCarsBtn = document.getElementById('loadCarsBtn');
            loadCarsBtn.click();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

