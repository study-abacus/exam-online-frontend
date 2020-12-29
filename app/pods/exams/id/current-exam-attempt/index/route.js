import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdCurrentExamAttemptIndexRoute extends Route {
  queryParams = {
    q: {
      refreshModel: true
    },
    allDone: {
      refreshModel: true
    }
  }

  async model(params) {
    const { q, allDone } = params;
    const { examination } = this.modelFor('exams.id');
    const questions = await examination.questions;
    const currentQuestionId = !allDone && (questions.toArray()[q || 0]).get('id');
    const currentQuestion = currentQuestionId && this.store.findRecord('question', currentQuestionId);
    const { questionAttempts, examAttempt } = this.modelFor('exams.id.current-exam-attempt');

    return hash({
      examination,
      examAttempt,
      questionAttempts,
      questions,
      currentQuestion
    })
  }
}
