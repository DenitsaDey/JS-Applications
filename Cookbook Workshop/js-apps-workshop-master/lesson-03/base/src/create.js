window.addEventListener('load', async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location = '/login.html';
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', onCreate)
});

async function onCreate(event){
    const url = 'http://localhost:3030/data/recipes';
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const token = localStorage.getItem('token');
    if(!token){
        window.location = '/login.html';
        return;
    }

    const recipe = {
        name, img, ingredients, steps
    }

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });

        if (!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        const result = await response.json();

        window.location = '/index.html';

    } catch(err){
        alert(err.message);
    }
}