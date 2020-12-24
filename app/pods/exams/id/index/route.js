import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdIndexRoute extends Route {
  queryParams = {
    examAttemptError: {
      refreshModel: false
    }
  }

  model() {
    const { examination } = this.modelFor('exams.id');
    return hash({
      examination
    })
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('actions', {
      onEnd: () => this.refresh()
    });
  }
}
