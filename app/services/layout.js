import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class LayoutService extends Service {
  @service session;
  @service router;

  @computed('router.currentRoute', 'session.isAuthenticated')
  get currentLayoutComponentName() {
    if (this.session.isAuthenticated) {
      if (!this.router.currentRoute) { return 'layouts/with-navbar-sidebar' }

      switch(this.router.currentRoute.name) {
        case 'exams.id.current-exam-attempt.index': return 'layouts/base'
        case 'index': return 'layouts/with-landing-navbar'
        default: return 'layouts/with-navbar-sidebar'
      }
    }

    return 'layouts/base';
  }
}
