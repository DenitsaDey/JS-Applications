import page from '../node_modules/page/page.mjs';
import { authMW } from './middlewares/authMW.js';
import { navigationMW } from './middlewares/navigationMW.js';
import { renderMW } from './middlewares/renderMW.js';

import {renderLogin } from './views/loginView.js'
import {renderRegister } from './views/registerView.js'
import {renderLogout } from './views/logoutView.js'
import {renderHome } from './views/homeView.js'
import {renderListing } from './views/listingView.js'
import {renderCreateCar } from './views/createCarView.js'
import {renderCarDetails } from './views/detailsCarView.js'
import {renderEditCar } from './views/editCarView.js'
import {renderDeleteCar } from './views/deleteCarView.js'
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
page('/', renderHome);
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', renderLogout);
page('/listing', renderListing);
page('/create', renderCreateCar);
page('/listing/:carId', renderCarDetails);
page('/listing/:carId/edit', renderEditCar);
page('/listing/:carId/delete', renderDeleteCar);
page('/my-listing/', renderMyListing);

page.start();