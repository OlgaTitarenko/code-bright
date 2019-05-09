async function getComment() {
    let response = await fetch('https://5cbef81d06a6810014c66193.mockapi.io/api/comments');
    let comments = await response.json();

    console.log(comments);
}
getComment();