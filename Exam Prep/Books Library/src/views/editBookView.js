import { html } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';

const editBookTemplate = (book, onSubmit) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="edit">
    <form id="edit-form" action="#" method="post" @submit=${onSubmit}>
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value="${book.title}">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" .value="${book.description}"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value="${book.imageUrl}">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value="${book.type}">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;


export async function renderEditBook(ctx){
    let bookId = ctx.params.bookId;

    const onSubmit = (e) => {
        e.preventDefault();

        let book = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(book).some(x => !x)) {
            return alert('All fields are required!');
        }

        bookService.updateBook(bookId, book);
        e.target.reset();
        ctx.page.redirect(`/details/${bookId}`);
    }

    const book = await bookService.getById(bookId);
    ctx.render(editBookTemplate(book, onSubmit));
}
