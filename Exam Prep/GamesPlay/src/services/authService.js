import * as api from './api.js';

const USER_KEY = 'userData';

export async function login(email, password){
    const result = await api.post('/users/login', { email, password});

    const userData = {
        email: result.email,
        id: result._id, 
        token: result.accessToken
    }
    
    setUserData(userData);
    return userData;
}

export async function register(email, password){
    const result = await api.post('/users/register', { email, password});

    const userData = {
        email: result.email,
        id: result._id, 
        token: result.accessToken
    }
    
    setUserData(userData);
    return userData;
}

export function logout(){
    api.get('/users/logout');
    clearUserData();
}

export function getUserData(){
    return JSON.parse(sessionStorage.getItem(USER_KEY));
}

export function setUserData(data){
    sessionStorage.setItem(USER_KEY,JSON.stringify(data));
}

export function clearUserData(){
    sessionStorage.removeItem(USER_KEY);
}

/*
full version with catching errors

export function getUserData() {
    try {
        let user = sessionStorage.getItem(USER_KEY);

        if (user) {
            return JSON.parse(user);
        }
    } catch (e) {
        e.message = "Error getting user data";
    }
}
*/