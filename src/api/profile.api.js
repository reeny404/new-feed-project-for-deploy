import supabase from '../supabaseClient';

class ProfileApi {
  #TABLE_NAME = 'USER_PROFILE';

  async getMyProfile(userId) {
    if (!userId) {
      return '';
    }
    const {
      data: { profile_url },
    } = await supabase.from(this.#TABLE_NAME).select().eq('user_id', userId).single();
    return profile_url;
  }
}

export default ProfileApi;
