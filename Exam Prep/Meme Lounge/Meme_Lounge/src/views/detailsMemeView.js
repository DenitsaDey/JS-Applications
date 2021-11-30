import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../services/memeService.js';

const detailsTemplate = (meme, userId, onDelete) => html`
        <section id="meme-details">
            <h1>Meme Title: ${meme.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                    ${meme.description}
                    </p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    ${userId != undefined && meme._ownerId == userId
                    ? html`
                    <a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} href="javascript:void(0)" class="button danger">Delete</button>`
                    : nothing
                    }
                </div>
            </div>
        </section>
   `;


export async function renderMemeDetails(ctx){
    console.log(ctx.params);
    const meme = await memeService.getById(ctx.params.memeId);
        
            if(!ctx.user){
                ctx.render(detailsTemplate(meme));
            } else{
                let userId = ctx.user.id;
                ctx.render(detailsTemplate(meme, userId, onDelete));
            }
         
    async function onDelete(){
        const memeId = ctx.params.memeId;
        const choice = confirm('Are you sure you want to delete this meme forever?');
        if(choice){
        await memeService.deleteMeme(memeId);
        ctx.page.redirect('/memes');
        }
    }
}