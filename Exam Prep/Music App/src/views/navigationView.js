import { html } from '../../node_modules/lit-html/lit-html.js';

const guestUserNav = () => html`
<!--Only guest-->
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
    `;

const loggedUserNav = () => html`
<!--Only user-->
    <li><a href="/create">Create Album</a></li>
    <li><a href="/logout">Logout</a></li>
    `;

const navTemplate = (user) => html`
    <nav>
        <img src="./images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <!--All user-->
            <li><a href="/listing">Catalog</a></li>
            <li><a href="/search">Search</a></li>

            ${user 
            ? loggedUserNav()
            : guestUserNav()
            }
            
        </ul>
    </nav>
    `;

export const renderNavigation = ({user}) => { // деструктурираме user от ctx
    return navTemplate(user);
}