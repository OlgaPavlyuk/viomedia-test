import { config } from './helpers';
import Photo from './Views/Photo';
import Collection from './Views/Collection';
import CollectionsList from './Views/CollectionsList';
import Pagination from './Views/Pagination';
import Breadcrumbs from './Views/Breadcrumbs';

const routes = [
  {
    path: 'collections',
    template: 'collectionsList'
  },
  {
    path: 'collections/:id/photos',
    template: 'collection'
  },
  {
    path: 'collections/:id/photos/:id',
    template: 'photo'
  }
];

class View {
  constructor() {
    this.app = this.getElement('#root');
    this.container = this.createElement('section', ['container']);
    this.displayWrapper = this.createElement('div', ['wrapper']);

    this.breadcrumbs = (this.createElement('nav', ['breadcrumbs']));
    this.paginationBtns = '';
    this.collectionsList = '';
    this.collection = '';
    this.photo = '';
    this.title = '';
    this.photosCount = '';
    this.currentPage = 1;
  }

  init() {
    this.app.append(this.container);
    this.container.append(this.displayWrapper);
    this.container.prepend(this.breadcrumbs);
    this.breadcrumbs.addEventListener('click', this._breadcrumbsNavigation);

    this.initRender();

    window.addEventListener('popstate', (e) => {
      this.changeRoute(document.location.pathname + document.location.search, false);
    });
  }

  bindInitCollectionInfo(callback) {
    this.getInformation = callback;
  }

  bindRouteChange(callback) {
    this.onChangedRoute = callback;
  }

  setInfo(data) {
    const { title, total_photos } = data;
    this.title = title;
    this.photosCount = total_photos;
  }

  initRender() {
    const initPath = document.location.pathname !== '/'
      ? document.location.pathname + document.location.search
      : '/collections?per_page=100';

    const currentRoute = this._matchUrlToRoute();

    if (currentRoute.template === 'collection' && this.title === '' && this.photosCount === '') {
      const id = initPath.split('/')[2];
      this.getInformation(`/collections/${id}`);
    }

    this.changeRoute(initPath);
  }

  changeRoute(url, updateState = true) {
    this.onChangedRoute(url);
    if (updateState) history.pushState({ url }, '', url);
    this.displayWrapper.classList.add('loading');
  }

  _matchUrlToRoute() {
    const currentUrl = window.location.pathname.slice(1).toLowerCase() || '/';
    const segmentsUrl = currentUrl.split('/');
    const matchedRoute = routes.find((route) => {
      const routePathSegments = route.path.split('/');
      if (routePathSegments.length !== segmentsUrl.length) {
        return false;
      }

      const match = routePathSegments.every((routePathSegment, i) => {
        return routePathSegment === segmentsUrl[i] || routePathSegment[0] === ':';
      });

      return match;
    });

    return matchedRoute;
  }

  renderView(data) {
    if (data.error) {
      this._displayError(data.error);
    }
    this.displayWrapper.classList.remove('loading');
    const currentRoute = this._matchUrlToRoute();
    let currentTemplate = '';
    if (currentRoute) {
      currentTemplate = currentRoute.template;
    }
    switch (currentTemplate) {
      case 'collectionsList':
        this._displayCollections(data);
        break;
      case 'collection':
        this._displayCollection(data);
        break;
      case 'photo':
        this._displayPhoto(data);
        break;
      default:
        this._displayError();
    }
  }

  _selectCollection = (e) => {
    e.preventDefault();
    const { target } = e;
    const link = target.closest('.js-select-collection');
    if (link) {
      this.title = link.dataset.title || '';
      this.photosCount = link.dataset.count;
      const url = `${link.getAttribute('href')}?page=${this.currentPage}&per_page=${config.PHOTOS_PER_PAGE}`;
      this.changeRoute(url);
    }
  }

  _selectPhoto = (e) => {
    e.preventDefault();
    const { target } = e;
    const link = target.closest('.js-select-photo');
    if (link) {
      this.breadcrumbs.innerHTML = Breadcrumbs(history.state.url, this.title);
      this.changeRoute(link.getAttribute('href'));      
    }
  }

  _paginateCollection = (e) => {
    e.preventDefault();
    const { target } = e;
    const gotoPage = target.dataset.page;
    this.currentPage = gotoPage;
    const url = `${location.pathname}?page=${gotoPage}&per_page=${config.PHOTOS_PER_PAGE}`;
    this.changeRoute(url);
  }

  _breadcrumbsNavigation = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.tagName === 'A') {
      this.changeRoute(target.getAttribute('href'));
    }
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  createElement(tag, classNames) {
    const element = document.createElement(tag);
    if (classNames) element.classList.add(...classNames);
    return element;
  }

  _displayCollections(data) {
    if (this.collectionList) this.collectionList.removeEventListener('click', this._selectPhoto);
    if (this.collectionsList) this.collectionsList.removeEventListener('click', this._selectCollection);

    this.currentPage = 1;
    const collections = CollectionsList(data);
    this.displayWrapper.innerHTML = collections;

    this.collectionsList = this.getElement('.js-collections-list');
    this.collectionsList.addEventListener('click', this._selectCollection);
  }

  _displayCollection(data) {
    if (this.collectionsList) this.collectionsList.removeEventListener('click', this._selectCollection);
    
    this.breadcrumbs.innerHTML = Breadcrumbs();

    const pagination = (this.photosCount > config.PHOTOS_PER_PAGE)
      ? Pagination(this.photosCount, this.currentPage, config.PHOTOS_PER_PAGE)
      : '';
    
    this.displayWrapper.innerHTML = Collection(data, this.title, pagination);
    this.collectionList = this.getElement('.js-collection');
    this.collectionList.addEventListener('click', this._selectPhoto); 

    this.paginationBtns = document.querySelectorAll('.btn[data-page]');
    this.paginationBtns.forEach((btn) => {
      btn.addEventListener('click', this._paginateCollection); 
    });

  }

  _displayPhoto(data) {
    this.currentPage = 1;
    if (this.paginationBtns) this.paginationBtns.forEach((btn) => {
      btn.addEventListener('click', this._paginateCollection);
    }); 
    if (this.collectionList) this.collectionList.removeEventListener('click', this._selectPhoto);  
    this.displayWrapper.innerHTML = Photo(data);
  }

  _displayError(error) {
    this.displayWrapper.innerHTML = `Something went wrong ${error}`;
  }
}

export default View;
