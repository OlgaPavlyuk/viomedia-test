class Model {
  constructor() {
    this.data = [];
    this.info = [];
    this.error = false;
  }

  bindModelChanged(callback) {
    this.onModelChanged = callback;
  }

  bindInfoChanged(callback) {
    this.onInfoChanged = callback;
  }

  changeModel(url) {
    this.getData(url)
      .then((data) => {
        if (!this.error) {
          this.data = data;
          this.errror = false;
          this.prevUrl = url;
        }
        this.onModelChanged(data);
      }); 
  }

  changeInfo(url) {
    this.getData(url)
      .then((data) => {
        if (!this.error) {
          this.info = data;
          this.errror = false;
        }
        this.onInfoChanged(data);
      });
  }

  getData(url) {
    const api_key = '1bfc8daa39d0d2a75494316589ddaa56e6116c7f0a60d1d3f3617d6807a78314';
    return fetch(`https://api.unsplash.com/${url}`, {
      headers: {
        'Authorization': 'Client-ID ' + api_key
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        return response.json()
      })
      .then(jsondata => jsondata)
      .catch(error => {
        this.error = true;
        return {error};
      });
  }
}

export default Model;
