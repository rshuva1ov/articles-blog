(() => {
  let arr = [];
  const getRemoteData = async () => {
    const pageParams = new URLSearchParams(window.location.search);
    const currentPageNumber = pageParams.get("page");
    const result = await fetch(
      `https://gorest.co.in/public-api/posts?page=${currentPageNumber}`
    );
    const remoteData = await result.json();

    return remoteData;
  };

  const createPostsList = async () => {
    const obj = await getRemoteData();
    const listContainer = document.querySelector(".list-group");

    for (let i = 0; i < obj.data.length; i++) {
      const link = document.createElement("a");
      link.setAttribute("href", `post.html?id=${obj.data[i].id}`);
      link.classList.add("list-group-item", "list-group-item-action");
      link.textContent = obj.data[i].title;
      listContainer.append(link);
    }
  };

  const createPostsNavigation = async () => {
    const navigation = document.querySelector(".navigation");
    const navigationList = document.createElement("ul");

    navigation.style = "margin: 30px 0 30px 0";
    navigationList.classList.add("pagination");
    navigationList.style = "overflow-x: scroll";
    const obj = await getRemoteData();
    const navigationLength = obj.meta.pagination.pages;
    const currentPage = obj.meta.pagination.page;

    for (let i = 0; i < navigationLength; i++) {
      const navigationListItem = document.createElement("li");
      const navigationLink = document.createElement("a");
      navigationListItem.classList.add("page-item");
      navigationLink.classList.add("page-link", "text-dark");
      navigationLink.setAttribute("data-page", `${i + 1}`);
      navigationLink.setAttribute("href", `index.html?page=${i + 1}`);
      navigationLink.textContent = `${i + 1}`;
      navigationListItem.append(navigationLink);
      arr.push(navigationListItem);
    }

    arr.forEach((item) => {
      navigationList.append(item);
      if (item.firstElementChild.dataset.page === `${currentPage}`) {
        item.classList.add("active");
      }
    });
    console.log(arr);
    navigation.append(navigationList);
  };

  document.addEventListener("DOMContentLoaded", () => {
    createPostsList();
    createPostsNavigation();
  });
})();
