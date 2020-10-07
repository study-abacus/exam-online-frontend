import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;
  @service currentUser;

  email = '';
  password = '';

  @action
  login() {
    this.session
      .authenticate('authenticator:jwt', {
        email: this.email,
        password: this.password
      })
      .then(() => this.currentUser.load())
      .then(() => {
        this.transitionToRoute('dashboard')
      })
  }
}
