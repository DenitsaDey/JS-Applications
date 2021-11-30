import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../services/memeService.js';

const memeTemplate = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
    </div>
`;

const listingTemplate = (memes = []) => html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                <!-- Display : All memes in database ( If any ) -->
				<!-- Display : If there are no memes in database -->
				${memes.length == 0
                ? html`<p class="no-memes">No memes in database.</p>`
                : memes.map(memeTemplate)
                }
            </div>
        </section>
     `;

export async function renderListing(ctx){

    const memes = await memeService.getAll();
    ctx.render(listingTemplate(memes));
        
}
