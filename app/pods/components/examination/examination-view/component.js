import Component from '@ember/component';
import { action, computed } from '@ember/object';

export default class ExaminationExaminationViewComponent extends Component {
  selectedExamination = null;

  didInsertElement() {
    this.set("selectedExamination", null);
  }

  @action
  selectExamination(examination) {
    this.set('selectedExamination', examination);
  }

  @action
  removeExamination(examination) {
    this.set('selectedExamination', null);
  }
}
