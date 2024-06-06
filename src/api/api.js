import PostApi from './posts.api';

class Api {
  constructor() {
    this.posts = new PostApi();
  }
}

const api = new Api();
export default api;
