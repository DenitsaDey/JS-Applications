// load all books
// create book
// edit book
// delete book

// handle create form
// handle edit form

// load book for editting
// handle delete button

// initialization
const libraryUrl = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector('tbody');
const createFormEl = document.getElementById('createForm')
const editFormEl = document.getElementById('editForm')
document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
createFormEl.addEventListener('click', onCreate);
editFormEl.addEventListener('click', onEditSumit);
tbody.addEventListener('click', onTableClick);

loadAllBooks();

async function request(url, options) {
    const response = await fetch(url, options);

    if(!response.ok){
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}


function createRow(id, book){
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class = "delete">Delete</button>
    </td>`;

    return row;
}

async function loadAllBooks(){
    const books = await request(libraryUrl);

    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replace(...result);
}


async function onCreate(event){
    event.preventDefault();

    const formData = new FormData(event.target.value);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({author, title});
    tbody.appendChild(createRow(result._id, result))
    event.target.reset();

}
async function createBook(book){
    const result = await request(libraryUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    return result;
}


async function onTableClick(event){
    if(event.target.className == 'delete'){
        onDelete(event.target);
    } else if(event.target.className == 'edit'){
        onEdit(event.target);
    }
}


async function onEdit(button){
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createFormEl.style.display = 'none';
    editFormEl.style.display = 'block';

    editFormEl.querySelector('[name="id"]').value = id;
    editFormEl.querySelector('[name="author"]').value = book.author;
    editFormEl.querySelector('[name="title"]').value = book.title;

}

async function onEditSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target.value);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await editBook(id, {author, title});
    event.target.reset();
    createFormEl.style.display = 'block';
    editFormEl.style.display = 'none';

    loadAllBooks();
}

async function loadBookById(id){
    const currBook = await request(`${libraryUrl}/${id}`);
    return currBook;
}

async function editBook(id, book){
    const result = await request(`${libraryUrl}/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    return result;
}


async function onDelete(button){
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function deleteBook(id){
    const result = await request(`${libraryUrl}${id}`, {
        method: 'delete'
    });

    return result;
}