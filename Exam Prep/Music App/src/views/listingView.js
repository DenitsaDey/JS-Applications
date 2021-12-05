import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';

const albumTemplate = (album, user) => html`
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${user 
            ? html`<div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>`
            : nothing}
            
        </div>
    </div>
    `;

const listingTemplate = (albums = [], user) => html`
<section id="catalogPage">
            <h1>All Albums</h1>

            ${albums.length == 0
            ? html`<p>No Albums in Catalog!</p>`
            : albums.map(a => albumTemplate(a, user))
            }

        </section>
    `;

export async function renderListing(ctx){

    const albums = await albumService.getAll();
    ctx.render(listingTemplate(albums, ctx.user));        
}