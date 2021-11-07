function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
    
    listElement.addEventListener('click', onDelete);

    loadContacts();
}

const listElement = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');
attachEvents();

async function loadContacts(){
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    listElement.replaceChildren();
    Object.values(data).map(createItem).forEach(i => {
        listElement.appendChild(i);
    });
    //Or listElement.replaceChildren(...Object.values(data).map(createItem));
}

function createItem(contact){
    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button data-id="${contact._id}">Delete</button>`;
    return liElement;
}

async function onCreate(){
    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = {person, phone};

    const result = await createContact(contact);
    listElement.appendChild(createItem(result));

    personInput.value = '';
    phoneInput.value = '';
}

async function createContact(contact){
    const response = await fetch('http://localhost:3030/jsonstore/phonebook',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
    });

    const result = await response.json();

    return result;
}

async function onDelete(event) {
    const id = event.target.dataset.id;
    if(id){
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}
async function deleteContact(id){
    const response = await fetch('http://localhost:3030/jsonstore/phonebook' + id,{
    method: 'delete'
    });

    const result = await response.json();

    return result;
}