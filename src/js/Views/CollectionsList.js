const CollectionsList = (data, pagination = '') => {
  let list = '';
  data.forEach((collection) => {
    const { id, title, total_photos } = collection;
    
    const li = `<li class='collections-list__item'>
      <a class='collections-list__link js-select-collection'
        href=${`/collections/${id}/photos`}
        data-title=${title}
        data-count=${total_photos}
      >
        ${title} <span class='collections-list__count'>(${total_photos})</span>
      </a>      
    </li>`;
    list += li;
  });

  return `<div class='collections'>
        <h1 class='title'>Collections list</h1>
        <ul class='collections-list js-collections-list'>
          ${list}
        </ul>
        ${pagination}
    </div>`
  ;
};

export default CollectionsList;
