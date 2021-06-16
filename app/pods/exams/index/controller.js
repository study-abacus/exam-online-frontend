import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class ExamsIndexController extends Controller {
  selectedExamination = null;

  @action
  selectExamination(examination) {
    this.set('selectedExamination', examination);
  }

  @action
  removeExamination(examination) {
    this.set('selectedExamination', null);
  }

  @action 
  onAfterApply() {
    this.set('selectedExaminations', []);
    this.transitionToRoute('dashboard');
  }
}
