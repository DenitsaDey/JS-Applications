import * as authService from '../services/authService.js';

export async function renderLogout(ctx){
    await authService.logout();
    ctx.page.redirect('/');
}