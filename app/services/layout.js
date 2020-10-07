import Service, { inject as service } from '@ember/service';

export default class LayoutService extends Service {
  @service session;
  @service router;

  get currentLayoutComponentName() {
    if (this.session.isAuthenticated) {
      return 'layouts/with-navbar-sidebar';
    }

    if (this.router.currentRoute && this.router.currentRoute.name === 'index') {
      return 'layouts/with-landing-navbar';
    }

    return 'layouts/base';
  }
}
