import * as authService from '../services/authService.js';

export function authMW(ctx, next){
    let user = authService.getUserData();

    if(user){
        ctx.user = user;
    }
    
    next();
}