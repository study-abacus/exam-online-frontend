import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class ExaminationModel extends Model {
  @attr() title;
  @attr() description;
  @attr() type;
  @attr() primaryPrice;
  @attr() secondaryPrice;
  @attr() start;
  @attr() registrationEnd;

  @computed('primaryPrice')
  get primaryPriceDisplay() {
    return this.primaryPrice / 100;
  }
}
