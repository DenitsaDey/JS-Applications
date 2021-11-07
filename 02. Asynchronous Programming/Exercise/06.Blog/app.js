function attachEvents() {
    
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
    const titleElement = document.getElementById('post-title');
    const bodyElement = document.getElementById('post-body');
    const ulElement = document.getElementById('post-comments');

    titleElement.textContent = 'Loading...';
    bodyElement.textContent = '';
    ulElement.replaceChildren();

    const selectionId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([
        getPostById(selectionId),
        getCommentsByPostId(selectionId)
    ])
    
    titleElement.textContent = post.title;
    bodyElement.textContent = post.body;

    

    comments.forEach(comment => {
        const liElement = document.createElement('li');
        liElement.textContent = comment.text;
        ulElement.appendChild(liElement);
    });
}

async function getAllPosts(){
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(postUrl);
    const data = await response.json();

    //parse data and populate list
    const dropDownMenu = document.getElementById('posts');
    dropDownMenu.replaceChildren();

    Object.values(data).forEach(p =>{
        const optionElement = document.createElement('option');
        optionElement.textContent = p.title;
        optionElement.value = p.id;

        dropDownMenu.appendChild(optionElement);
    });
}

async function getPostById(postId){
    const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;

    const response = await fetch(postUrl);
    const data = await response.json();

    return data;
}

async function getCommentsByPostId(postId){
    const commentUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const response = await fetch(commentUrl);
    const data = await response.json();

    const comments = Object.values(data).filter(c => c.postId == postId);
    return comments;
}