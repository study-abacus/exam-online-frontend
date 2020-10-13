import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop'

export default class BaseNavBarComponent extends Component {
  @service session;
  @service currentUser;
  @service sideBar;
  @service router;

  showPopup = false;

  @action
  toggleSidebar() {
    later(() => {
      this.sideBar.toggleSidebar();
    }, 200)
  }

  @action
  logout() {
    this.session.invalidate();
    this.router.transitionTo('login');
  }
}
