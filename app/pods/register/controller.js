import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class RegisterController extends Controller {
  @service api;
  @service session;
  @service currentUser;

  @alias('createAccountTask.last') lastResult

  formData = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: ''
  }

  @dropTask
  *createAccountTask() {
    yield this.api.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        ...this.formData
      })
    })
    return this.session
      .authenticate('authenticator:jwt', {
        email: this.formData.email,
        password: this.formData.password
      })
      .then(() => this.currentUser.load())
      .then(() => {
        this.transitionToRoute('dashboard')
      })
  }
}
