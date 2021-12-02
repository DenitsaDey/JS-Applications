import * as api from './api.js';

const endpoints = {
    latest: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    all: '/data/games?sortBy=_createdOn%20desc',
    byId: '/data/games/',
    byYear: (year) => `/data/games?where=year%3D${year}`,
    own: (userId) => `/data/gamess?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/games',
    edit: '/data/games/',
    delete: '/data/games/', 
    allComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    createComment: '/data/comments',
}

export async function getAll(){
    return api.get(endpoints.all);
}

export async function getLatest(){
    return api.get(endpoints.latest);
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

export async function createGame(game){
    return api.post(endpoints.create, game);
}

export async function updateGame(id, game){
    return api.put(endpoints.edit + id, game);
}

export async function deleteGame(id){
    return api.del(endpoints.delete + id);
}

export async function getAllComments(gameId){
    return api.get(endpoints.allComments(gameId))
}

export async function createComment(gameId, comment){
    return api.post(endpoints.createComment, {gameId, comment});
}