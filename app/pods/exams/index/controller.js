import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ExamsIndexController extends Controller {
  selectedExaminations = [];

  @action
  selectExamination(examination) {
    if (this.selectedExaminations.length > 1) return;
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
