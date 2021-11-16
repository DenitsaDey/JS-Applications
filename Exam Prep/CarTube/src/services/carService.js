import * as api from './api.js';
import * as request from './requester.js';

export const getAll = () => {
    return request.get(`${api.cars}?sortBy=_createdOn%20desc`) 
}

export const getOwn = (userId) => {
    return request.get(`${api.cars}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
} 

export const getOne = (id) => {
    return request.get(`${api.cars}/${id}`);
}

export const createCar = (car) => {
    return request.post(api.cars, car); 
}

export const updateCar = (id, car) => {
    return request.put(`${api.cars}/${id}`, car); 
}

export const deleteCar = (id) => {
    return request.del(`${api.cars}/${id}`); 
}

/*
_createdOn: 1616162253496
​​
_id: "3987279d-0ad4-4afb-8ca9-5b256ae3b298"
​​
_ownerId: "35c62d76-8152-4626-8712-eeb96381bea8"
​​
brand: "Audi"
​​
description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
​​
imageUrl: "/images/audia3.jpg"
​​
model: "A3"
​​
price: 25000
​​
year: 2018
*/