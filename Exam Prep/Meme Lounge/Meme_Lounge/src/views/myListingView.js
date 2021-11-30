import { html } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../services/memeService.js';

const memeRecord = (meme) => html`
                <!-- Display : All created memes by this user (If any) --> 
                <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>
        `;

const myListingTemplate = (memes = [], user) => html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
            ${memes.length == 0
            ? html`<p class="no-memes">No memes in database.</p>`
            : memes.map(memeRecord)}
            </div>
        </section>
   `;


export async function renderMyListing(ctx){
    let userId = ctx.user.id;
    const memes = await memeService.getOwn(userId);
    
    ctx.render(myListingTemplate(memes, ctx.user));
}
