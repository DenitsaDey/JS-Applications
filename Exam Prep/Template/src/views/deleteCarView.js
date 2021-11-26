import * as carService from '../services/carService.js';

export const renderDeleteCar = (ctx) => {
    const carId = ctx.params.carId;
    
    carService.deleteCar(carId)
    .then(() => ctx.page.redirect('/listing'));
}