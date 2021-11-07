async function solution() {
    const mainSection = document.getElementById('main');

    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const articles = await response.json();

    console.log('test');
    console.log(articles); //{id:, title:}
    console.log(Object.values(articles));
    console.log(Object.entries(articles));
    console.log(Object.keys(articles));

    Object.values(articles).forEach(a =>{
        const url2 = `http://localhost:3030/jsonstore/advanced/articles/details/${a.id}`;
        const response2 = await fetch(url2);
        const articles2 = await response2.json();
        let newArticle = createArticle(a.id, a.title, articles2.content);
        mainSection.appendChild(newArticle);

    })
}

solution();

function createArticle(id, title, content){
    let accordionDiv = document.createElement('div');
    accordionDiv.classList.add('accordion');

    let headDiv = document.createElement('div');
    headDiv.classList.add('head');

    let spanEl = document.createElement('span');
    spanEl.textContent = title;

    let btnEl = document.createElement('button');
    btnEl.id = id;
    btnEl.classList.add('button');
    btnEl.textContent = 'More';
    btnEl.addEventListener('click', showMore);

    let divExtra = document.createElement('div');
    divExtra.classList.add('extra');
    divExtra.style.display = 'none';

    let pEl = document.createElement('p');
    pEl.textContent = content;
    
    headDiv.appendChild(spanEl);
    headDiv.appendChild(btnEl);

    divExtra.appendChild(pEl);

    accordionDiv.appendChild(headDiv);
    accordionDiv.appendChild(divExtra);

    return accordionDiv;
}

function showMore(e){
    const btn = e.target;
    btn.textContent = btn.textContent === 'Less' ? 'More' : 'Less';
    btn.style.display = btn.style.display === 'none' ? 'block' : 'none';
}