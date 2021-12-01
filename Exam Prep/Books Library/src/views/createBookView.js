import { html } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';

const createBookTemplate = (onSubmit) => html`
<!-- Create Page ( Only for logged-in users ) -->
        <section id="create-page" class="create">
            <form id="create-form" action="#" method="post" @submit=${onSubmit}>
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>
   `;


export const renderCreateBook = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();

        let book = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(book).some(x => !x)) {
            return alert('All fields are required!');
        }

        bookService.createBook(book);
        e.target.reset();
        ctx.page.redirect('/listing');
    }
    ctx.render(createBookTemplate(onSubmit));
}
