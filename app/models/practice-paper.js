import Model, { attr } from '@ember-data/model';

export default class PracticePaperModel extends Model {
  @attr() title;
  @attr() documentUrl;
}
