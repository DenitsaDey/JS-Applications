import { html } from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../services/memeService.js';
import { notify } from './notifyView.js';

const createMemeTemplate = (onSubmit) => html`
        <section id="create-meme">
            <form id="create-form" @submit=${onSubmit}>
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
   `;


export const renderCreateMeme = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();

        let meme = Object.fromEntries(new FormData(e.currentTarget));

        if (Object.values(meme).some(x => !x)) {
            return notify('All fields are required!');
        }

        memeService.createMeme(meme);
        e.target.reset();
        ctx.page.redirect('/memes');
    }
    ctx.render(createMemeTemplate(onSubmit));
}
