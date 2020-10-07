import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service layout;
  @service session;

  beforeModel() {
    if (this.session.isAuthenticated) {
      this.transitionTo('dashboard');
    }
  }

  activate() {
    this.layout.setCurrentLayout('with-landing-navbar')
  }

  deactivate() {
    this.layout.revertCurrentLayout()
  }
}
