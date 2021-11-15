import { register} from '../api/data.js';


const section = document.getElementById('registerPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export async function showRegisterPage(ctxTarget){
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();

    if(!email || !password || !rePass){
        return alert('Fields are required');
    }
    if(password != rePass){
        return alert('Passwords don\'t match!')
    }
    await register(email, password);
    ctx.goTo('home');
    ctx.updateNav();
}