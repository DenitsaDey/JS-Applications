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

const searchTemplate = (onSearch, cars = [], params = '') => html`
<section id="search-cars">
<h1>Filter by year</h1>

<!--
    <form @submit=${onSearch}>
        <input type="text" name="search" .value=${params}>
        <input type="submit" value="Search">
    </form>
 -->
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
    /* search by V.Kostadinov
    const params = ctx.querystring.split('=')[1]; // getting the search word, so that when we share the link for the search it displays the search word as well
    */

    const onSearch = (e) => {
        e.preventDefault();

        let inputEl = e.target.parentElement.querySelector('#search-input')
        let year = Number(inputEl.value);

        carService.getByYear(year)
            .then(cars => {
                console.log(cars)
                ctx.render(searchTemplate(onSearch, cars)); //(onSearch, cars, params)
            })

        /* by Victor Kostadinov
            e.preventDefault();
            const formData = new FormData(e.target);
            const search = formData.get('search');

            if(search){
                ctx.page.redirect('/search?query=' + encodeURIComponent(search));
            }

            if(params){
                let cars = await carService.searchCars(decodeURIComponent(params));
                ctx.render(searchTemplate(onSearch, cars, params))
            }
        */
    }

    ctx.render(searchTemplate(onSearch));
}
