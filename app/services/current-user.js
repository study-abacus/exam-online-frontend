import Service, { inject as service } from '@ember/service';

export default class CurrentUserService extends Service {
  @service store;

  user = null;
  profile = null;

  async load() {
    const user = await this.store.queryRecord('user', { 
      custom: {
        ext: 'url',
        url: 'me'
      }
    });

    this.set('user', user);

    const profile = await user.profile;
    if (profile) {
      this.set('profile', await this.store.findRecord('profile', user.profile.get('id')))
    } else {
      this.set('profile', this.store.createRecord('profile', {
        school: '',
        class: '',
        currentLevel: 1,
        user: user
      }));
    }

    return user;
  }
}
