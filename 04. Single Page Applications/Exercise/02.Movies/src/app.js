import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister
};

const navigation = document.querySelector('nav');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

navigation.addEventListener('click', (event) =>{
        const view = views[event.target.id];
        if(typeof view == 'function'){
            event.preventDefault();
            view();
        }
});

updateNav();
//Start application in home view (catalog)
showHome();

export function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData != null){
        navigation.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...navigation.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...navigation.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else{
        [...navigation.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...navigation.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}

async function onLogout(event){
    event.preventDefault();
    event.stopImmediatePropagation();

    const {token} = JSON.parse(sessionStorage.getItem('userData'));

        await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();
}

