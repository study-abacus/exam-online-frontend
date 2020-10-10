import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class ExaminationSelectedExaminationComponent extends Component {
  @service api;
  @service store;

  showPaymentModal = false;

  @alias('applyToSelectedExaminations.lastSuccessful.value') lastOrder

  @dropTask
  *applyToSelectedExaminations() {
    const examinationIds = this.selectedExaminations.mapBy('id');

    const resp = yield this.api.request('/orders/buy', {
      method: 'POST',
      body: JSON.stringify({
        examinationIds
      })
    });

    const order = yield this.store.findRecord('order', resp.data.id)
    this.set('showPaymentModal', true)
    return order
  }

  @action
  onAfterPay() {
    this.set('showPaymentModal', false)
    if (this.onAfterApply) {
      this.onAfterApply();
    }
  }
}
