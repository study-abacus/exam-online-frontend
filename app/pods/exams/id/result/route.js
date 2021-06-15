import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdResultRoute extends Route {
  model() {
    const { examination } = this.modelFor('exams.id');
    const examAttempt = examination.examAttempt;

    return hash({
      examination,
      examAttempt
    })
  }

  setupController(controller, model) {
    controller.set('examination', model.examination);
    controller.set('examAttempt', model.examAttempt);
  }
}
