import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';

export default class ExaminationModel extends Model {
  @attr() title;
  @attr() code;
  @attr() description;
  @attr() type;
  @attr() primaryPrice;
  @attr() secondaryPrice;
  @attr() start;
  @attr() registrationEnd;
  @hasMany('question') questions;
  @hasMany('practice-paper') practicePapers;
  @belongsTo('exam-attempt') examAttempt;

  @computed('primaryPrice')
  get primaryPriceDisplay() {
    return this.primaryPrice / 100;
  }
}
