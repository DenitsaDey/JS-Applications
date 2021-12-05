import page from '../node_modules/page/page.mjs';
import { authMW } from './middlewares/authMW.js';
import { navigationMW } from './middlewares/navigationMW.js';
import { renderMW } from './middlewares/renderMW.js';

import {renderLogin } from './views/loginView.js'
import {renderRegister } from './views/registerView.js'
import {renderLogout } from './views/logoutView.js'
import {renderHome } from './views/homeView.js'
import {renderListing } from './views/listingView.js'
import {renderCreateAlbum } from './views/createAlbumView.js'
import {renderAlbumDetails } from './views/detailsAlbumView.js'
import {renderEditAlbum } from './views/editAlbumView.js'
import {renderSearch } from './views/searchView.js'

// authMW would go first so that navigationMW can have access to it
page(authMW);
// the navigationMW will apply for every request despite the request path and will modify as per the authMW
page(navigationMW);
page(renderMW);

page('/', renderHome);
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', renderLogout); 
page('/listing', renderListing);
page('/create', renderCreateAlbum);
page('/details/:albumId', renderAlbumDetails);
page('/edit/:albumId', renderEditAlbum);
page('/search', renderSearch);

page.start();

