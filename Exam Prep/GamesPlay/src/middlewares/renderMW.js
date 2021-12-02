import { render } from '../../node_modules/lit-html/lit-html.js';

const mainEl = document.getElementById('main-content');

export function renderMW(ctx, next){
    ctx.render = (templateResult) => {
        render(templateResult, mainEl);
    }

    next();
}