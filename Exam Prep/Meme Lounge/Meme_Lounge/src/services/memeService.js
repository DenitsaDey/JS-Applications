import * as api from './api.js';

const endpoints = {
    all: '/data/memes?sortBy=_createdOn%20desc',
    byId: '/data/memes/',
    own: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/memes',
    edit: '/data/memes/',
    delete: '/data/memes/'
}

export async function getAll(){
    return api.get(endpoints.all);
}

export async function getById(id){
    return api.get(endpoints.byId + id);
}

export async function getOwn(userId){
    return api.get(endpoints.own(userId))
}

export async function createMeme(meme){
    return api.post(endpoints.create, meme);
}

export async function updateMeme(id, meme){
    return api.put(endpoints.edit + id, meme);
}

export async function deleteMeme(id){
    return api.del(endpoints.delete + id);
}