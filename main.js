async function sendComment() {
    event.preventDefault();
    const title = document.querySelector('input');
    const body = document.querySelector('textarea');

    if ( title.value.length === 0) {
        title.insertAdjacentHTML('afterend', '<p class="error-message">too little title</p>');
        return;
    }
    if (body.value.length < 3 ) {
        body.insertAdjacentHTML('afterend', '<p class="error-message">too little text</p>');
        return;
    }

    const rawResponse = await fetch('https://5cbef81d06a6810014c66193.mockapi.io/api/comments', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
          "created_at": 1556025370,
          "title": title.value,
          "body": body.value
       })
    });
    const content = await rawResponse.json();
   title.value = '';
   body.value = '';
}

async function deleteComment(id) {
    const rawResponse = await fetch('https://5cbef81d06a6810014c66193.mockapi.io/api/comments/'+id, {
        method: 'DELETE'
    });
    const content = await rawResponse.json();
}
deleteComment(18);

async function updateComment(id) {
    const rawResponse = await fetch('https://5cbef81d06a6810014c66193.mockapi.io/api/comments/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "created_at": 1556025370,
            "title": "title.value",
            "body": "body.value"
        })
    });
    const content = await rawResponse.json();
}
updateComment(19);

const divComments = document.querySelector('.div-comments');

async function getComment() {
    const response = await fetch('https://5cbef81d06a6810014c66193.mockapi.io/api/comments');
    const comments = await response.json();
    console.log(comments);
    divComments.innerHTML = `
    <div class="comments">
    <h1>
       Comments
    </h1>
    <section class="section-comm">
    ${comments.map(comment =>
        `<article class="comments">
            <h5>${comment.title}</h5>
            <p>${comment.body.slice(0,250)}</p>
            <button onclick="getOneComment(${comment.id})"> Read more</button>
        </article>`
    ).join('')}
 </section> 
 </div>   
`;
};

async function getOneComment (id) {
    const response = await fetch('https://5cbef81d06a6810014c66193.mockapi.io/api/comments/'+id);
    const comment = await response.json();
    console.log(comment);
    divComments.innerHTML = `
      <div class="comment">
        <section>
            <a href=# class="back-to-comm" onclick="getComment()">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                Back to Comments
            </a>
            <h2>${comment.title}</h2>            
            <p>${comment.body}</p>
        </section>
    </div>
     `;

}

getComment();



