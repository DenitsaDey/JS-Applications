import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as bookService from '../services/bookService.js';

const detailsTemplate = (book, bookLikes, myLikes, userId, onDelete, onLike) => html`
<!-- Details Page ( for Guests and Users ) -->
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>

                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${userId != undefined && book._ownerId == userId
                ? html`<div class="actions">
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <button @click=${onDelete} href="javascript:void(0)" class="button danger">Delete</button>
                    </div>`
                : nothing}

                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${userId != undefined && book._ownerId != userId && !myLikes
                ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
                : nothing}

                    <!-- ( for Guests and Users ) -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${bookLikes}</span>
                    </div> 
                    <!-- Bonus -->
                
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`;


export async function renderBookDetails(ctx) {

    const book = await bookService.getById(ctx.params.bookId); // 'bookId' because that's how we named the url in app.js -> page('/listing/:bookId', renderBookDetails);
    const bookLikes = await bookService.likesByBook(ctx.params.bookId);
    
    if (!ctx.user) {
        ctx.render(detailsTemplate(book, bookLikes));
    } else {
        let userId = ctx.user.id;
        let myLikes = await bookService.myLikesByBook(ctx.params.bookId, userId);
        ctx.render(detailsTemplate(book, bookLikes, myLikes, userId, onDelete, onLike)); 
    }

    async function onDelete() {
        const bookId = ctx.params.bookId;
        const choice = confirm('Are you sure you want to delete this meme forever?');
        if (choice) {
            await bookService.deleteBook(bookId);
            ctx.page.redirect('/listing');
        }
    }

    async function onLike() {
        const bookId = ctx.params.bookId;
        await bookService.likeBook(bookId);
        ctx.page.redirect('/details/' + bookId);
    }
}