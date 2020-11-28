import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdCurrentExamAttemptRoute extends Route {
  async model() {
    const { examination } = this.modelFor('exams.id');
    const examAttempt = examination.examAttempt;
    const questionAttempts = this.store.query('question-attempt', {
      custom: {
        ext: 'url',
        url: `examination/${examination.id}`
      }
    })

    return hash({
      questionAttempts,
      examAttempt
    });
  }
}
