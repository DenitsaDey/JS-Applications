import { html } from '../../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';

const registerTemplate = (onSubmit) => html`
<!-- Register Page ( Only for Guest users ) -->
        <section id="register-page" class="register">
            <form id="register-form" action="" method="post" @submit=${onSubmit}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`;

export function renderRegister(ctx){
    async function onSubmit(e){ 
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('confirm-pass');

        if (email == '' && password == '') {
            return alert('All fields are required');
        }

        if(password != rePass){
            return alert('Password does not match.');
        }

        await authService.register(email, password)
        e.target.reset();
        ctx.page.redirect('/listing');
    }
    ctx.render(registerTemplate(onSubmit));
}