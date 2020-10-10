import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ExamsIndexController extends Controller {
  queryParams = ['q'];
  selectedExaminations = [];
  q = '';

  @action
  selectExamination(examination) {
    if (!this.selectedExaminations.includes(examination)) {
      this.selectedExaminations.pushObject(examination);
    }
  }

  @action
  removeExamination(examination) {
    if (this.selectedExaminations.includes(examination)) {
      this.selectedExaminations.removeObject(examination);
    }
  }

  @action 
  onAfterApply() {
    this.set('selectedExaminations', []);
    this.transitionToRoute('dashboard');
  }
}
