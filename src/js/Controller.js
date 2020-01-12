class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view,
    this.model.bindModelChanged(this.handleChangedModel);
    this.view.bindRouteChange(this.listenRouteChanged);
    this.model.bindInfoChanged(this.handleChangedInfo);
    this.view.bindInitCollectionInfo(this.listenInfoChanged);

    this.view.init();
  }

  handleChangedModel = (data) => {
    this.view.renderView(data);
  }

  handleChangedInfo = (data) => {
    this.view.setInfo(data);
  }

  listenRouteChanged = (url) => {
    this.model.changeModel(url);
  }

  listenInfoChanged = (url) => {
    this.model.changeInfo(url);
  }
}

export default Controller;