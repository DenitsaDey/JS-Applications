function attachEvents() {
    //add event listener to load button
    document.getElementById('refresh').addEventListener('click', loadMessages);
    //add event listener to post button
    document.getElementById('submit').addEventListener('click', onSubmit);

    loadMessages();
}

const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');
const listElement = document.getElementById('messages');

attachEvents();

//load and display all messages
async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();

    const messages = Object.values(data);

    listElement.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');   
}

//add single message to list
async function onSubmit(){
    const author = authorInput.value;
    const content = contentInput.value;

    const result = await createMessage({author, content});

    contentInput.value = '';
    listElement.value += '\n' + `${author}: ${content}`; 
}
//post message
async function createMessage(message){
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(message)
    };
    const res = await fetch(url, options);
    const result = res.json();

    return result;
}
