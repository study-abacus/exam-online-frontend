import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default class ResetPasswordController extends Controller {
  @service api;

  @alias('resetPasswordTask.last') lastResult

  formData = {
    password: '',
    passwordRepeat: ''
  };

  @dropTask
  *resetPasswordTask() {
    yield this.api.request(`/forget-password/reset-password/${this.model.token}`, {
      method: 'POST',
      body: JSON.stringify({
        ...this.formData
      })
    });

    later(() => {
      this.transitionToRoute('login')
    }, 2000);
  }
}
