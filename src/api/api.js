import PostApi from './posts.api';
import ProfileApi from './profile.api';

class Api {
  constructor() {
    this.posts = new PostApi();
    this.profile = new ProfileApi();
  }
}

const api = new Api();
export default api;
