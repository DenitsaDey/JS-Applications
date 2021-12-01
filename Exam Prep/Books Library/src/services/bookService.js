import * as api from './api.js';

const endpoints = {
    all: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/',
    own: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/books',
    edit: '/data/books/',
    delete: '/data/books/',
    createLike: '/data/likes',
    likesByBook: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    likesByBookAndUser: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function createBook(book){
    return api.post(endpoints.create, book);
}

export async function updateBook(id, book){
    return api.put(endpoints.edit + id, book);
}

export async function deleteBook(id){
    return api.del(endpoints.delete + id);
}

export async function likeBook(bookId){
    return api.post(endpoints.createLike, {bookId});
}

export async function likesByBook(bookId){
    return api.get(endpoints.likesByBook(bookId));
}

export async function myLikesByBook(bookId, userId){
    return api.get(endpoints.likesByBookAndUser(bookId, userId));
}
