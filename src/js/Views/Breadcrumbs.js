const Breadcrumbs = (href, title) => {
  const collectionLink = href
    ? `<a class='breadcrumbs__link' href='${href}'>Collection ${title}</a>`
    : '';
  
  return `<nav class='breadcrumbs'>
      <a class='breadcrumbs__link' href='/collections?per_page=100'>Collections</a>
      ${collectionLink}
    </nav>`
    ;
};

export default Breadcrumbs;
