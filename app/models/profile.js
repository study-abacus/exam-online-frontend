import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';

export default class ProfileModel extends Model {
  @attr() school;
  @attr() class;
  @attr() guardianName;
  @attr() contact;
  @attr() address;
  @attr() city;
  @attr({ defaultValue: 'India' }) country;
  @attr() currentCourse;
  @attr({ defaultValue: [] }) currentLevel;
  @attr() otherTeacher;
  @belongsTo('user') user;
  @belongsTo('teacher') teacher;

  @computed('currentCourse')
  get currentCourseDisplay() {
    return this.currentCourse?.join(', ') || ''
  }

  @computed('teacher.name', 'otherTeacher')
  get teacherNameDisplay() {
    if (this.otherTeacher !== null) return this.otherTeacher;

    return this.teacher.get('name');
  }
}
