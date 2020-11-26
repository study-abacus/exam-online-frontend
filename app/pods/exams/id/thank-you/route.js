import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdThankYouRoute extends Route {
  model() {
    const { examination } = this.modelFor('exams.id');
    const examAttempt = examination.examAttempt.reload();

    return hash({
      examination,
      examAttempt
    })
  }
}
