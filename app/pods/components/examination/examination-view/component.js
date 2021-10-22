import Component from '@ember/component';
import { action, computed } from '@ember/object';

export default class ExaminationExaminationViewComponent extends Component {
  selectedExaminations = [];

  didInsertElement() {
    this.set("selectedExaminations", []);
  }

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
}
