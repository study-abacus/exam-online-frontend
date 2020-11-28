import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class QuestionModel extends Model {
  @attr() title;
  @attr() description;
  @attr() type;
  @belongsTo('question-attempt') questionAttempt;
  @hasMany('choice') choices;
}
