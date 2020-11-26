import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdCurrentExamAttemptRoute extends Route {
  queryParams = {
    q: {
      refreshModel: true
    }
  }

  async model(params) {
    const { q } = params;
    const { examination } = this.modelFor('exams.id');
    const examAttempt = examination.examAttempt;
    const questions = await examination.questions;
    const currentQuestion = questions.toArray()[q || 0];
    const questionAttempts = this.store.query('question-attempt', {
      custom: {
        ext: 'url',
        url: `examination/${examination.id}`
      }
    })

    return hash({
      examination,
      questions,
      examAttempt,
      currentQuestion,
      questionAttempts
    });
  }
}
