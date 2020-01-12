const Photo = (data) => {
  const { alt_description, description, likes = 0, location, urls, tags } = data;

  const descriptionElem = description ? `<h1 class='photo__description'>${description}</h1>` : '';
  const altDescriptionElem= alt_description ? `<p class='photo__alt-desription'>${alt_description}</p>` : '';
  const cityInfo = location.city ? `<div class='photo__city'>${location.city}</div>` : '';

  let tagsList = '';
  tags.forEach((tag) => {
    tagsList += `
      <li class='tag'>${tag.title}</li>
    `;
  });

  return (
    `<div class='photo'>
      ${descriptionElem}
      <div class='photo__likes'>Likes: ${likes}</div>
      <div class='photo__wrap'>
        <img alt='${alt_description || "photo"}' src=${urls.small} class='photo__img'>
      </div>
      ${altDescriptionElem}

      ${cityInfo}
      <ul class='photo__tags'>Tags: ${tagsList}</ul>      
    </div>`
  );
}

export default Photo;
