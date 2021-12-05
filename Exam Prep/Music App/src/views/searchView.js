import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';

const albumResult = (album, user) => html`
<!--If have matches-->
    <div class="card-box">
            <img src="${album.imgUrl}">
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price: $${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>
                ${user
                ? html`<div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                    	</div>`
                : nothing
                }
            </div>
        </div>
        `;

const searchTemplate = (onSearch, albums = [], user) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${onSearch}>Search</button>
        </div>
    
        <h2>Results:</h2>
        <!--Show after click Search button-->
        <div class="search-result">
            ${albums.length == 0
                ? html`<p class="no-result">No result.</p>`
                : albums.map(a => albumResult(a, user))
            }
    
        </div>
    </section>
    `;


export async function renderSearch(ctx){

    async function onSearch(e){
        e.preventDefault();

        let inputEl = e.target.parentElement.querySelector('#search-input')
        let query = inputEl.value;
        inputEl.value = '';

        let albums = await albumService.getBySearch(query);
        ctx.render(searchTemplate(onSearch, albums, ctx.user));
        
    }

    ctx.render(searchTemplate(onSearch));
}
