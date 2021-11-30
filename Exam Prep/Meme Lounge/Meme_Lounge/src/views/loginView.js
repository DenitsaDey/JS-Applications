import { html } from '../../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';
import { notify } from './notifyView.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <form id="login-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
        `;

export function renderLogin(ctx) {
    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        if (email == '' && password == '') {
            return notify('All fields are required');
        }
        await authService.login(email, password);
        e.target.reset();
        ctx.page.redirect('/memes');
    }
    ctx.render(loginTemplate(onSubmit));
}