import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExamsIdCurrentExamAttemptController extends Controller {
  @service store;

  queryParams = ['q'];
  q = null;

  @action
  nextQuestion() {
    if (this.q && this.q < (this.model.questions.length - 1)) {
      this.set('q', this.q ? +this.q + 1 : 1);
    }
  }
}
