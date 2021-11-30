import { html } from '../../node_modules/lit-html/lit-html.js';

const guestUserNav = () => html`
<!-- Guest users -->
            <div class="guest">
                <div class="profile">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                <a href="/">Home Page</a>
            </div>
    `;

const loggedUserNav = (email) => html`
<!-- Logged users -->
            <div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${email}</span>
                    <a href="/profile">My Profile</a>
                    <a href="/logout">Logout</a>                  
                    <!--<a id="logoutBtn" href="javascript:void(0)">Logout</a> -->
                </div>
            </div>
    `;

const navTemplate = (user) => html`
 <nav>
    <a href="/memes">All Memes</a>
    
    ${user 
        ? loggedUserNav(user.email)
        : guestUserNav()
    }
</nav>
`;

export const renderNavigation = ({user}) => { // деструктурираме user от ctx
    return navTemplate(user);
}
