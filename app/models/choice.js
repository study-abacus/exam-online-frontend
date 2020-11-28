import Model, { attr, belongsTo } from '@ember-data/model';

export default class ChoiceModel extends Model {
  @attr title;
  @belongsTo('question') question;
}
