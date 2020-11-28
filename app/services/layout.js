import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class LayoutService extends Service {
  @service session;
  @service router;

  @computed('router.currentRoute')
  get currentLayoutComponentName() {
    if (this.session.isAuthenticated) {
      if (!this.router.currentRoute) { return 'layouts/with-navbar-sidebar' }

      switch(this.router.currentRoute.name) {
        case 'exams.id.current-exam-attempt.index': return 'layouts/base'
        default: return 'layouts/with-navbar-sidebar'
      }
    }

    if (this.router.currentRoute && this.router.currentRoute.name === 'index') {
      return 'layouts/with-landing-navbar';
    }

    return 'layouts/base';
  }
}
