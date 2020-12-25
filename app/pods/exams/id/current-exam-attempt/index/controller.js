import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';

export default class ExamsIdCurrentExamAttemptController extends Controller {
  @service store;
  @service api;

  queryParams = ['q'];
  q = null;
  showSubmitConfirmationModal = false;
  allDone = false;

  @action
  nextQuestion() {
    if (this.q && this.q < (this.model.questions.length - 1)) {
      this.set('q', +this.q + 1);
      return;
    }

    if (+this.q === (this.model.questions.length - 1)) {
      this.set('allDone', true)
    }

    if (this.model.questions.length > 1) {
      this.set('q', 1);
    }
  }

  @action
  onNavigate(q) {
    this.set('allDone', false)
    this.set('q', q)
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
