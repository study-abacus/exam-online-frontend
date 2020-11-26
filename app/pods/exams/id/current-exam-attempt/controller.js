import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';

export default class ExamsIdCurrentExamAttemptController extends Controller {
  @service store;
  @service api;

  queryParams = ['q'];
  q = null;

  @action
  nextQuestion() {
    if (this.q && this.q < (this.model.questions.length - 1)) {
      this.set('q', this.q ? +this.q + 1 : 1);
    }
  }

  @dropTask
  *submitTest() {
    yield this.api.request(`/exam-attempts/${this.model.examAttempt.id}/submit`, {
      method: 'POST',
      body: '{}'
    })
    this.transitionToRoute('exams.id.thank-you')
  }
}
