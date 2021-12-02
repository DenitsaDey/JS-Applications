import { html } from '../../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';

const registerTemplate = (onSubmit) => html`
<!-- Register Page ( Only for Guest users ) -->
    <section id="register-page" class="content auth">
            <form id="register" @submit=${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" required>

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password" required>

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" required>

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;

export function renderRegister(ctx) {
    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('confirm-password').trim();

        if (email == '' && password == '') {
            return alert('All fields are required');
        }
        if (password != rePass) {
            alert('Password does not match.');
        }

        await authService.register(email, password);
        e.target.reset();
        ctx.page.redirect('/');
    }
    ctx.render(registerTemplate(onSubmit));
}