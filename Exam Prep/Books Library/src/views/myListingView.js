import { html } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';

const bookRecord = (book) => html`
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <a class="button" href="/details/${book._id}">Details</a>
        </li> `;

const myListingTemplate = (books = []) => html`
<!-- My Books Page ( Only for logged-in users ) -->
    <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <!-- Display paragraph: If the user doesn't have his own books  -->
            ${books.length == 0
            ? html`<p class="no-books">No books in database!</p>`
            : html`<ul class="my-books-list"></ul>
                    ${books.map(bookRecord)}
                    </ul>`}
        </section>`;


export async function renderMyListing(ctx) {
    let userId = ctx.user.id;
    const books = await bookService.getOwn(userId);
    ctx.render(myListingTemplate(books)); // or when user details needed in the view => (cars, ctx.user)
}
