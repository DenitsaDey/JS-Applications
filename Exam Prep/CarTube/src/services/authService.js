import * as api from './api.js';
import * as request from './requester.js';

const USER_KEY = 'user';
export const login = (username, password) => {
    return request.post(api.login, { username, password })
        .then(user => {
            saveUserData(user);
            return user;
        });
};

export const register = (username, password) => {
    return request.post(api.register, { username, password })
        .then(user => {
            saveUserData(user);
            return user;
        });
};

export const logout = () => {
    return request.get(api.logout)
    .finally(destroySession);
}

function destroySession(){
    localStorage.removeItem(USER_KEY);
}

function saveUserData(data) {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
}

export function getUserData() {
    try {
        let user = localStorage.getItem(USER_KEY);

        if (user) {
            return JSON.parse(user);
        }
    } catch (e) {
        e.message = "Error getting user data";
    }
}