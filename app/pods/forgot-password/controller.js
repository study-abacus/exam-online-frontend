import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ForgotPasswordController extends Controller {
  @service api;

  @tracked isError = false;
  @tracked isSuccess = false;

  formData = {
    email: ''
  }

  @dropTask
  *forgotPasswordTask() {
    try {
      yield this.api.request(`/forget-password`, {
        method: 'POST',
        body: JSON.stringify({
          ...this.formData
        })
      });
      this.isSuccess = true;
      this.isError = false;
    } catch (err) {
      this.isError = true;
      this.isSuccess = false;
    }
  }
}
