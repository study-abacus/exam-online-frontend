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
  @belongsTo('user') user;

  @computed('currentCourse')
  get currentCourseDisplay() {
    return this.currentCourse?.join(', ') || ''
  }
}
