import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class VerifyRoute extends Route {
  @service api;
  @service currentUser;

  async model(params) {
    const token = params.token;
    try {
      const resp = await this.api.request(`/users/verify/${token}`, {
        method: 'POST',
        body: JSON.stringify({})
      })
      this.transitionTo('dashboard');
      this.currentUser.load();
    } catch (err) {
      return false;
    }
  }
}
