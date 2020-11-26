import Model, { attr, belongsTo } from '@ember-data/model';

export default class ExamAttemptModel extends Model {
  @attr() start
  @attr() isSubmitted
  @attr() submittedAt
  @attr() result
  @belongsTo('examination') examination
  @belongsTo('user') user
}
