import { html } from '../../node_modules/lit-html/lit-html.js';

const guestUserNav = () => html`
<!-- Guest users -->
    <div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>
    `;

const loggedUserNav = (email) => html`
<!-- Logged-in users -->
        <div id="user">
            <span>Welcome, ${email}</span>
            <a class="button" href="/profile">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>
    `;

const navTemplate = (user) => html`
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/listing">Dashboard</a>
                    ${user 
                     ? loggedUserNav(user.email)
                    : guestUserNav()
                    }                    
                </section>
            </nav>`;

export const renderNavigation = ({user}) => { // деструктурираме user от ctx
    return navTemplate(user);
}