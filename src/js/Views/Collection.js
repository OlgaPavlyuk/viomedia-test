const Collection = (data, title, pagination) => {

  let list = '';
  data.forEach((photo) => {
    const { id, color, description, urls } = photo;

    const li = `<li class='collection__item' style='background-color: ${color}'>
      <a class='collection__link js-select-photo' href=${`photos/${id}`} ${description ? 'title=' + description : ''}>
        <img class='collection__photo' alt='${description || "photo"}' src=${urls.thumb}>
      </a>      
    </li>`;
    list += li;
  });

  return `<h1 class='title'>Collection ${title}</h1>
    <ul class='collection js-collection'>
      ${list}
    </ul>
    ${pagination}`;
};

export default Collection;