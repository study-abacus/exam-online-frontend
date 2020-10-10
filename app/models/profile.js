import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProfileModel extends Model {
  @attr() school;
  @attr() class;
  @attr() currentLevel;
  @belongsTo('user') user;
}
