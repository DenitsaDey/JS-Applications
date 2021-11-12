/*
VS will aoutomatically import it once we start typing the function bellow and then press Tab
it's important to use single quotes and to add the .js extention at the end
*/
import { showView } from './dom.js';
import { showHome } from './home.js';
import { updateNav } from './app.js';

const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

//showView has to be public to other modules, thus we use "export" in front of the funtion
export function showLogin(){
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try{
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if(response.status == false){
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));

        form.reset();
        updateNav();
        showHome();
    } catch (err){
        alert(err.message);
    }
}