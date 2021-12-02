import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../services/gameService.js';

const gameTemplate = (game) => html`
            <div class="allGames">
                <div class="allGames-info">
                    <img src="${game.imageUrl}">
                    <h6>${game.category}</h6>
                    <h2>${game.title}</h2>
                    <a href="/details/${game._id}" class="details-button">Details</a>
                </div>
            </div>`;

const listingTemplate = (games = []) => html`
<section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
            <!-- Display paragraph: If there is no games  -->
            ${games.length == 0
            ? html`<h3 class="no-articles">No articles yet</h3>`
            : games.map(gameTemplate)
            }   
        </section>`;

export async function renderListing(ctx){

    const games = await gameService.getAll();
    ctx.render(listingTemplate(games));        
}