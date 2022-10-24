(() => {
  const getRemoteData = async (urlPath) => {
    const pageParams = new URLSearchParams(window.location.search);
    const postId = pageParams.get('id');
    const result = await fetch(urlPath + postId);
    const remoteData = await result.json();

    return remoteData;
  };

  const createPostPage = async () => {
    const post = await getRemoteData('https://gorest.co.in/public-api/posts/');
    const comments = await getRemoteData('https://gorest.co.in/public-api/comments?post_id=');
    const title = document.querySelector('.title');
    const postContainer = document.querySelector('.post-body');
    const commentsList = document.querySelector('.comments');

    title.textContent = post.data.title;
    postContainer.textContent = post.data.body;

    if (comments.data.length !== 0) {
      for (let i = 0; i < comments.data.length; i++) {
        const comment = document.createElement('li');
        const commentUser = document.createElement('div');
        const userName = document.createElement('div');
        const userMail = document.createElement('div');
        commentUser.classList.add('d-flex', 'justify-content-between', 'align-items-start');
        comment.classList.add('list-group-item', 'list-group-item-info');
        comment.textContent = comments.data[i].body;
        userName.textContent = `name: ${comments.data[i].name}`;
        userMail.textContent = `email: ${comments.data[i].email}`;
        commentUser.append(userName, userMail);
        comment.prepend(commentUser);
        commentsList.append(comment);
      }
    }
  };
  document.addEventListener('DOMContentLoaded', () => {
    createPostPage();
  });
})();
