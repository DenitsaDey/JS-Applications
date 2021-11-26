import * as api from './api.js';

const endpoints = {
    all: '/data/cars?sortBy=_createdOn%20desc',
    byId: '/data/cars/',
    byYear: (year) => `/data/cars?where=year%3D${year}`,
    own: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/cars',
    edit: '/data/cars/',
    delete: '/data/cars/'
}

export async function getAll(){
    return api.get(endpoints.all);
}

export async function getById(id){
    return api.get(endpoints.byId + id);
}

export const getByYear = (year) => {
    return api.get(endpoints.byYear(year));
}

export async function getOwn(userId){
    return api.get(endpoints.own(userId))
}

export async function createCar(car){
    return api.post(endpoints.create, car);
}

export async function updateCar(id, car){
    return api.put(endpoints.edit + id, car);
}

export async function deleteCar(id){
    return api.del(endpoints.delete + id);
}