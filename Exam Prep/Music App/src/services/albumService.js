import * as api from './api.js';

const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/albums/',
    bySearch: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
    create: '/data/albums',
    edit: '/data/albums/',
    delete: '/data/albums/'
}

export async function getAll(){
    return api.get(endpoints.all);
}

export async function getById(id){
    return api.get(endpoints.byId + id);
}

export const getBySearch = (query) => {
    return api.get(endpoints.bySearch(query));
}

export async function searchCars(query){
    return api.get(endpoints.byQuery(query))
}

export async function getOwn(userId){
    return api.get(endpoints.own(userId))
}

export async function createAlbum(album){
    return api.post(endpoints.create, album);
}

export async function updateAlbum(id, album){
    return api.put(endpoints.edit + id, album);
}

export async function deleteAlbum(id){
    return api.del(endpoints.delete + id);
}