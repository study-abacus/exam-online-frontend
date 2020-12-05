import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ResetPasswordRoute extends Route {
  @service api;

  async model(params) {
    const token = params.token;
    try {
      const resp = await this.api.request(`/forget-password/verify-reset-token/${token}`, {
        method: 'POST',
        body: JSON.stringify({})
      });

      return hash({
        token
      });
    } catch (err) {
      this.transitionTo('token-expired');
    }
  }
}
