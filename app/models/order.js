import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class OrderModel extends Model {
  @attr() amount;
  @attr() description;
  @attr() examinations;
  @attr() isPaid;
  @attr() razorpayOrderId;

  @computed('amount')
  get amountDisplay() {
    return this.amount / 100;
  }
}
