import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;
  @service currentUser;

  email = '';
  password = '';

  @dropTask
  *login() {
    yield this.session.authenticate('authenticator:jwt', {
      email: this.email,
      password: this.password
    })
    yield this.currentUser.load()
    this.transitionToRoute('dashboard')
  }
}
