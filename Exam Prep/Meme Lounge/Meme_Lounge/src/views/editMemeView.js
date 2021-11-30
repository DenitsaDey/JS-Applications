import { html } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../services/memeService.js';
import { notify } from './notifyView.js';

const editMemeTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value="${meme.title}">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value="${meme.description}">

                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl"
                .value="${meme.imageUrl}">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
   `;


export async function renderEditMeme(ctx) {
    let memeId = ctx.params.memeId;

    const onSubmit = (e) => {
        e.preventDefault();

        let meme = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(meme).some(x => !x)) {
            return notify('All fields are required!');
        }

        memeService.updateMeme(memeId, meme);
        e.target.reset();
        ctx.page.redirect(`/details/${memeId}`)

    }

    const meme = await memeService.getById(memeId);
    console.log(meme);
    ctx.render(editMemeTemplate(meme, onSubmit));

}
