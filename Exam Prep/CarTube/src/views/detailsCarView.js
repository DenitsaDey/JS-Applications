import { html, nothing} from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';

const detailsTemplate = (car, userId) => html`
    <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        ${car._ownerId == userId
            ? html`<div class="listings-buttons">
            <a href="/listing/${car._id}/edit" class="button-list">Edit</a>
            <a href="/listing/${car._id}/delete" class="button-list">Delete</a>
        </div>`
            : nothing
        }
        
    </div>
    </section>
   `;


export const renderCarDetails = (ctx) => {
    let userId = ctx.user._id;
 carService.getOne(ctx.params.carId)
 .then(car => {
     ctx.render(detailsTemplate(car, userId));
 });    
}