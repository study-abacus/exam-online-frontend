import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class OrdersOrderPaymentComponent extends Component {
  @service currentUser;
  @service api;
  @service store;

  @tracked currentOrder;

  constructor() {
    super(...arguments);
    this.currentOrder = this.args.order
  }

  get options() {
    if (!this.currentOrder) return {}

    return {
      "key": "rzp_test_Ou4rWUqLrEoS8l",
      "amount": this.currentOrder.amount,
      "currency": "INR",
      "name": "Brain 'o' Mind",
      "order_id": this.currentOrder.razorpayOrderId,
      "handler": async response => {
        console.log(response)
        const resp = await this.api.request(`/orders/${this.currentOrder.id}/capture`, {
          method: 'POST',
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: this.currentOrder.razorpayOrderId
          })
        });
  
        if (this.args.onAfterPay) {
          this.onAfterPay()
        }
      },
      //"prefill": {
      //  "name": this.currentUser.user.name,
      //  "email": this.currentUser.user.email
      //}
    }
  }

  @dropTask
  *payNow() {
    yield this.api.request(`/orders/${this.currentOrder.id}/pay`, {
      method: 'POST',
      body: JSON.stringify({})
    })
    yield this.currentOrder.reload()

    const rzp1 = new Razorpay(this.options);
    rzp1.open();
  }
}
