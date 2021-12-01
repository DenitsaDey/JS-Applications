import { render } from '../../node_modules/lit-html/lit-html.js';
import { renderNavigation } from '../views/navigationView.js';

const navEl = document.getElementById('site-header');

export function navigationMW(ctx, next){
    // for every request we make the navigation has to be visualised and then the request continues with the rest of the page
    render(renderNavigation(ctx), navEl);

    next();
}