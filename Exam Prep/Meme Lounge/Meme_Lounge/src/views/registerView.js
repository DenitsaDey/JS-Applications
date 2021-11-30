import { html } from '../../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';
import { notify } from './notifyView.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username" required>
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password" required>
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass" required>
            <div class="gender" required>
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
   `;

export function renderRegister(ctx) {
    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('repeatPass');
        let gender = formData.get('gender');
        
        if (username == '' && email == '' && password == '') {
            return notify('All fields are required');
        }
        if (password != rePass) {
            return notify('Password does not match.');
        }
        await authService.register(username, email, password, gender);
        e.target.reset();
        ctx.page.redirect('/memes')

    }
    ctx.render(registerTemplate(onSubmit));
}