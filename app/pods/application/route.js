import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service currentUser;

  async beforeModel() {
    if (this.session.isAuthenticated) {
      await this.currentUser.load();
    }
  }
}
