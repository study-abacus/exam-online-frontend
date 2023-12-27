import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BaseSideBarComponent extends Component {
  @service sideBar;
  @service session;
  @service router;

  @action
  closeSideBar() {
    this.sideBar.closeSidebar();
  }

  @action
  logout() {
    this.session.invalidate();
    this.router.transitionTo('login');
  }
}
