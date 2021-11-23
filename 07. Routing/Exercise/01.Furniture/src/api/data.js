import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myFurniture: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/'
}

export async function getAll(){
    return api.get(endpoints.all);
}

export async function getById(id){
    return api.get(endpoints.byId + id);
}

export async function getMyFurniture(userId){
    return api.get(endpoints.myFurniture(userId))
}

export async function createFurniture(furniture){
    return api.post(endpoints.create, furniture);
}

export async function updateFurniture(id, furniture){
    return api.put(endpoints.edit + id, furniture);
}

export async function deleteFurniture(id){
    return api.del(endpoints.delete + id);
}
