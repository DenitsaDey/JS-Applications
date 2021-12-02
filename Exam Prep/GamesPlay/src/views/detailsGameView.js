import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../services/gameService.js';

const commentTemplate = (comment) => html`
        <li class="comment">
            <p>Content: ${comment.body}</p>
        </li>`;

const detailsTemplate = (game, comments = [], userId, onDelete, onComment) => html`
<!--Details Page-->
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                ${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                <h2>Comments:</h2>
                    <!-- Display paragraph: If there are no games in the database -->
                    ${comments.length == 0 
                        ? html`<p class="no-comment">No comments.</p>` 
                        : html`<ul>
                        ${comments.map(commentTemplate)}
                    </ul>`}
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${userId != undefined && game._ownerId == userId
                ? html`<div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
                : nothing
                }
                
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${userId != undefined && game._ownerId != userId
              ? html`<article class="create-comment">
                <label>Add new comment:</label>
                <form class="form" @submit=${onComment}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`
            : nothing}

        </section>`;


export async function renderGameDetails(ctx) {

    const game = await gameService.getById(ctx.params.gameId); // 'gameId' because that's how we named the url in app.js -> page('/listing/:gameId', renderGameDetails);
    const comments = await gameService.getAllComments(ctx.params.gameId);

    if (!ctx.user) {
        ctx.render(detailsTemplate(game, comments));
    } else {
        let userId = ctx.user.id;
        ctx.render(detailsTemplate(game, comments, userId, onDelete, onComment));
    }

    async function onDelete() {
        const gameId = ctx.params.gameId;
        const choice = confirm('Are you sure you want to delete this meme forever?');
        if (choice) {
            await gameService.deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }

    async function onComment(e){
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let comment = formData.get('comment').trim();
        if(comment == ''){
            return alert('You can\'t post an empty comment');
        }

        await gameService.createComment(ctx.params.gameId, comment);
        e.target.reset();
        ctx.page.redirect(`/details/${game._id}`);
    }
}