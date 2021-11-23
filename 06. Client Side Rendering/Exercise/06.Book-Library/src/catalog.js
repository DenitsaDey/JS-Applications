import {getBooks, html, until, deleteBook} from './utility.js'; 

const bookTemplate = (book, onEdit, onDelete) => html`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button @click=${onEdit}>Edit</button>
                    <button @click=${onDelete}>Delete</button>
                </td>
            </tr>
            `;


const catalogTemplate = (booksPromise) => html`<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        ${until(booksPromise, html`<tr><td colSpan="3">Loading&hellip;</td></tr>`)}
        </tbody>
    </table>`;

export function showCatalog(ctx){
    return catalogTemplate(loadBooks(ctx));
}

async function loadBooks(ctx){
    const data = await getBooks();

    const books = Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }));

    console.log(books);

    return Object.values(books).map(book => bookTemplate(book, toggleEditor.bind(null, book, ctx), onDelete.bind(null, book._id, ctx)));
}

function toggleEditor(book, ctx){
    ctx.book = book;
    ctx.update();
}

 async function onDelete(id, ctx){
    await deleteBook(id);
    ctx.update();
}