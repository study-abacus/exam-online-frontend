import Service from '@ember/service';

export default class SideBarService extends Service {
  isOpen = false;

  toggleSidebar() {
    this.toggleProperty('isOpen');
  }

  closeSidebar() {
    this.set('isOpen', false);
  }
}
