import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class ForgotPasswordController extends Controller {
  @service api;

  @alias('forgotPasswordTask.last') lastResult

  @dropTask
  *forgotPasswordTask(email) {
    yield this.api.request(`/forget-password`, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    });
  }
}
