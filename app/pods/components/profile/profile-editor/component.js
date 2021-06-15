import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class ProfileProfileEditorComponent extends Component {
  @service store;

  availableCourses = [
    'Abacus',
    'Vedic Maths'
  ]
  @alias('fetchTeachersTask.lastSuccessful.value') teachers = []

  @computed('args.profile.otherTeacher')
  get teacherNotInList() {
    if (this.args.profile.otherTeacher !== null) return true;

    return false;
  }

  constructor() {
    super(...arguments);
    this.fetchTeachersTask.perform();
  }

  @dropTask
  *fetchTeachersTask() {
    return this.store.query('teacher', {});
  }

  @dropTask
  *saveProfileTask() {
    if (this.args.profile.teacher) {
      this.args.profile.set('teacher', null);
    }

    if (this.args.user.hasDirtyAttributes) {
      yield this.args.user.save();
    }

    if (this.args.profile.hasDirtyAttributes) {
      yield this.args.profile.save();
    }

    if (this.args.onAfterSave()) {
      this.args.onAfterSave();
    }
  }

  @action
  toggleTeacherOther() {
    if (this.args.profile.otherTeacher) {
      return this.args.profile.set('otherTeacher', null);
    }

    this.args.profile.set('otherTeacher', '');
    return this.args.profile.set('teacher', null);
  }
}
