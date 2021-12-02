import { html } from '../../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';

const loginTemplate = (onSubmit) => html`
<!-- Login Page ( Only for Guest users ) -->
        <section id="login-page" class="auth">
            <form id="login" @submit=${onSubmit}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;

export function renderLogin(ctx){
    async function onSubmit(e){ 
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        if (email == '' && password == '') {
            return alert('All fields are required');
        }
        await authService.login(email, password);
        e.target.reset();
        ctx.page.redirect('/');
    }
    ctx.render(loginTemplate(onSubmit));
}