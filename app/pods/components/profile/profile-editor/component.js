import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency-decorators';

export default class ProfileProfileEditorComponent extends Component {
  @dropTask
  *saveProfileTask() {
    return this.args.profile.save();
  }
}
