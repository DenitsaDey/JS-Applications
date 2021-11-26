import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';

const carResult = (car) => html`
<!-- Display all records -->
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/listing/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

const searchTemplate = (onSearch, cars = []) => html`
<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year" />
    <button class="button-list" @click=${onSearch}>Search</button>
</div>

<h2>Results:</h2>
<div class="listings">

    
    ${cars.length == 0
        ? html`<p class="no-cars"> No results.</p>`
        : cars.map(carResult)
    }

    
</div>
</section>
   `;


export const renderSearch = (ctx) => {
    console.log('searchPage');
    console.log(carService.getByYear(2016));

    const onSearch = (e) => {
        e.preventDefault();

        let inputEl = e.target.parentElement.querySelector('#search-input')
        let year = Number(inputEl.value);

        carService.getByYear(year)
            .then(cars => {
                console.log(cars)
                ctx.render(searchTemplate(onSearch, cars));
            })
    }

    ctx.render(searchTemplate(onSearch));
}
