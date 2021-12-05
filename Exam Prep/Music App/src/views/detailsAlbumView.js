import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';

const detailsTemplate = (album, userId, onDelete) => html`
    <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${userId != undefined && album._ownerId == userId
                    ? html`<div class="actionBtn">
                                <a href="/edit/${album._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                            </div>`
                    : nothing
                    }
                    
                </div>
            </div>
        </section>
   `;


export async function renderAlbumDetails(ctx) {

    const album = await albumService.getById(ctx.params.albumId); // 'albumId' because that's how we named the url in app.js -> page('/listing/:albumId', renderAlbumDetails);

    if (!ctx.user) {
        ctx.render(detailsTemplate(album));
    } else {
        let userId = ctx.user.id;
        ctx.render(detailsTemplate(album, userId, onDelete));
    }

    async function onDelete() {
        const albumId = ctx.params.albumId;
        const choice = confirm('Are you sure you want to delete this album forever?');
        if (choice) {
            await albumService.deleteAlbum(albumId);
            ctx.page.redirect('/listing');
        }
    }
}