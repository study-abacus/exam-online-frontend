import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency-decorators';

export default class ProfileProfileEditorComponent extends Component {
  availableCourses = [
    'Abacus',
    'Vedic Maths',
    'English'
  ]

  @dropTask
  *saveProfileTask() {
    if (this.args.user.hasDirtyAttributes) {
      yield this.args.user.save();
    }

    if (this.args.profile.hasDirtyAttributes) {
      yield this.args.profile.save();
    }
  }
}
