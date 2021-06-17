import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ExamsIndexController extends Controller {
  @action 
  onAfterApply() {
    selectedExaminations = [];
    this.transitionToRoute('dashboard');
  }
}
