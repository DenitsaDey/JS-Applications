import * as authService from '../services/authService.js';

export function renderLogout(ctx){
    authService.logout();
    ctx.page.redirect('/');
}

