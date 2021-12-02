import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../services/gameService.js';

const editGameTemplate = (game, onSubmit) => html`
<!-- Edit Page ( Only for the creator )-->
    <section id="edit-page" class="auth">
            <form id="edit" @submit=${onSubmit}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value="${game.title}">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value="${game.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${game.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value="${game.imageUrl}">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value="${game.summary}"></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
   `;


export async function renderEditGame(ctx){
    let gameId = ctx.params.gameId;

    const onSubmit = (e) => {
        e.preventDefault();

        //this works but doesn't pass the tests
        //let game = Object.fromEntries(new FormData(e.currentTarget));

        let formData = new FormData(e.currentTarget);

        let title = formData.get('title').trim();
        let category = formData.get('category').trim();
        let maxLevel = formData.get('maxLevel').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let summary = formData.get('summary').trim();

        let game = { title, category, maxLevel, imageUrl, summary };

        if (Object.values(game).some(x => !x)) {
            return alert('All fields are required!');
        }

        gameService.updateGame(gameId, game);
        e.target.reset();
        ctx.page.redirect(`/details/${gameId}`);
    }

    const game = await gameService.getById(gameId);
    ctx.render(editGameTemplate(game, onSubmit));
}
