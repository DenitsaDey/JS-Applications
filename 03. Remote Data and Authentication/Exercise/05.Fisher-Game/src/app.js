let userData = null;
window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData != null){
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
    } else {
        document.getElementById('user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadData);
});

async function loadData(){
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview));
}

function createPreview(item){
    if(userData && item._ownerId == userData.id){
        consoel.log('current user is owner of item', item,angler);
    }
    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML =
    `<label>Angler</label>
    <input type="text" class="angler" value=${item.angler}>
    <label>Weight</label>
    <input type="text" class="weight" value=${item.weight}>
    <label>Species</label>
    <input type="text" class="species" value=${item.species}>
    <label>Location</label>
    <input type="text" class="location" value=${item.location}>
    <label>Bait</label>
    <input type="text" class="bait" value=${item.bait}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value=${item.captureTime}>
    <button class="update" data-id=${item._id}>Update</button>
    <button class="delete" data-id=${item._id}>Delete</button>`;

    return element;
}