import page from '../node_modules/page/page.mjs';
import { authMW } from './middlewares/authMW.js';
import { navigationMW } from './middlewares/navigationMW.js';
import { renderMW } from './middlewares/renderMW.js';

import {renderLogin } from './views/loginView.js'
import {renderRegister } from './views/registerView.js'
import {renderLogout } from './views/logoutView.js'
import {renderListing } from './views/listingView.js'
import {renderCreateBook } from './views/createBookView.js'
import {renderBookDetails } from './views/detailsBookView.js'
import {renderEditBook } from './views/editBookView.js'
import {renderMyListing } from './views/myListingView.js'

// authMW would go first so that navigationMW can have access to it
page(authMW);
// the navigationMW will apply for every request despite the request path and will modify as per the authMW
page(navigationMW);
page(renderMW);

//this is set up together with start()
/* for testing purposes: 
page('/', () => console.log('Loaded'));
page('/login', () => console.log('login'));
page('/register', () => console.log('register'));
*/

page('/', renderListing);
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', renderLogout); // or check bellow without url endpoint by using Logout button event listener
page('/listing', renderListing);
page('/create', renderCreateBook);
page('/details/:bookId', renderBookDetails);
page('/edit/:bookId', renderEditBook);
page('/profile', renderMyListing);

page.start();

// document.getElementById('logoutBtn').addEventListener('click', onLogout);
// async function onLogout(){
//     await logout();
//     page.redirect('/');
// }