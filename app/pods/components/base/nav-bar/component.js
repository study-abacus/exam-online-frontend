import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop'

export default class BaseNavBarComponent extends Component {
  @service currentUser;
  @service sideBar;

  @action
  toggleSidebar() {
    later(() => {
      this.sideBar.toggleSidebar()
    }, 200)
  }
}
