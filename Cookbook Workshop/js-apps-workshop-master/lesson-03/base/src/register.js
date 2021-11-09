window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister)
});

async function onRegister(event){
    const url = 'http://localhost:3030/users/register'
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();

    if(password != rePass) {
        return console.error('Passwords don\'t match');
    }

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if(response.ok != true){
            throw new Error(data.message);
        }

        const token = data.accessToken;
        sessionStorage.setItem('authToken', token);
        window.location = '/index.html';
        //or window.location.pathname = 'index.html';
    } catch (err) {
        alert(err.message)
    }
}