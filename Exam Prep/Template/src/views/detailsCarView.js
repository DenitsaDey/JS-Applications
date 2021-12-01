import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';

//                      (car, userId, onDelete)
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
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${userId != undefined && car._ownerId == userId
            ? html`<div class="listings-buttons">
                <a href="/edit/${car._id}" class="button-list">Edit</a>
                <a href="/listing/${car._id}/delete" class="button-list">Delete</a>
                <!-- or
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${onDelete} href="javascript:void(0)" class="button danger">Delete</button>
                     -->
            </div>`
            : nothing
            }
            
        </div>
    </section>
   `;


export async function renderCarDetails(ctx) {

    const car = await carService.getById(ctx.params.carId); // 'carId' because that's how we named the url in app.js -> page('/listing/:carId', renderCarDetails);

    if (!ctx.user) {
        ctx.render(detailsTemplate(car));
    } else {
        let userId = ctx.user._id;
        ctx.render(detailsTemplate(car, userId)); //(car, userId, onDelete)
    }

    // async function onDelete() {
    //     const carId = ctx.params.carId;
    //     const choice = confirm('Are you sure you want to delete this meme forever?');
    //     if (choice) {
    //         await carService.deleteCar(carId);
    //         ctx.page.redirect('/listing');
    //     }
    // }
}