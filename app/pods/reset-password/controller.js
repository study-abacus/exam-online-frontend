import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ResetPasswordController extends Controller {
  @service api;

  @tracked isError = false;
  @tracked isSuccess = false;

  formData = {
    password: '',
    passwordRepeat: ''
  };

  @dropTask
  *resetPasswordTask() {
    try {
      yield this.api.request(`/forget-password/reset-password/${this.model.token}`, {
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
