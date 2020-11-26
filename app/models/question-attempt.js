import Model, { attr, belongsTo } from '@ember-data/model';

export default class QuestionAttemptModel extends Model {
  @attr('string') answer;
  @attr('boolean') willReview;
  @belongsTo('question') question;
}
