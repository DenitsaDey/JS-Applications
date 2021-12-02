import { html } from '../../node_modules/lit-html/lit-html.js';

const guestUserNav = () => html`
    <!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    `;

const loggedUserNav = () => html`
<!-- Logged-in users -->
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>
    `;

const navTemplate = (user) => html`
<!-- Navigation -->
<h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/listing">All games</a>
                ${user 
                ? loggedUserNav(user.email)
                : guestUserNav()}  
            </nav>`;

export const renderNavigation = ({user}) => { // деструктурираме user от ctx
    return navTemplate(user);
}