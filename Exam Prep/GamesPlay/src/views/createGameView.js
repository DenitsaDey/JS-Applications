import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../services/gameService.js';
//import { notify } from './notifyView.js';
// replace alert with notify

const createGameTemplate = (onSubmit) => html`
<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="auth">
    <form id="create" @submit=${onSubmit}>
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>
   `;


export const renderCreateGame = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();

        // this works but does not pass the tests
        // let game = Object.fromEntries(new FormData(e.currentTarget));
        
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

        gameService.createGame(game);
        e.target.reset();
        ctx.page.redirect('/');
    }
    ctx.render(createGameTemplate(onSubmit));
}
