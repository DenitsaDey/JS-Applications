import { html } from '../../node_modules/lit-html/lit-html.js';

const guestUserNav = () => html`
<!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    `;

const loggedUserNav = (username) => html`
<!-- Logged users -->
    <div id="profile">
        <a>Welcome ${username}</a>
        <a href="/profile">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
    </div>
    `;

const navTemplate = (user) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/listing">All Listings</a>
    <a href="/search">By Year</a>
    
    ${user 
        ? loggedUserNav(user.username)
        : guestUserNav()
    }
</nav>`;

export const renderNavigation = ({user}) => { // деструктурираме user от ctx
    return navTemplate(user);
}