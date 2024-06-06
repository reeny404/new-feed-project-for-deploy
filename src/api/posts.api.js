import supabase from '../supabaseClient';
/*
- POST table schema : {id, created_at, content, like, name, tag, title, view}
- supabase return { data, status, statusText }
*/

class PostApi {
  #TABLE_NAME = 'POSTS';

  constructor() {}

  async getRecentPosts({ startNo, rownum }) {
    const response = await supabase
      .from(this.#TABLE_NAME)
      .select()
      .range(startNo, startNo + rownum)
      .order('id', { ascending: false });
    return this.#getResult(response, []);
  }

  async getPopularPosts() {
    const response = await supabase
      .from(this.#TABLE_NAME)
      .select()
      .gte('view', 10)
      .limit(5)
      .order('view', { ascending: false });
    return this.#getResult(response, []);
  }

  async getMyPosts(userId) {
    const response = await supabase
      .from(this.#TABLE_NAME)
      .select()
      .order('id', { ascending: false })
      .eq('name', userId);
    return this.#getResult(response, []);
  }

  async search(keyword) {
    const response = await supabase.from(this.#TABLE_NAME).select().like('title', `%${keyword}%`);
    return this.#getResult(response, []);
  }

  #getResult(response, defaultValue) {
    const status = response.status;
    if (status === 200) {
      return response.data;
    }
    console.warn(`${status} : ${response.statusText}`, response.error);
    return defaultValue;
  }
}

export default PostApi;
