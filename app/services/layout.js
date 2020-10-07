import Service from '@ember/service';

export default class LayoutService extends Service {
  currentLayout = 'base'
  previousLayout = null

  get currentLayoutComponentName() {
    return `layouts/${this.currentLayout}`
  }

  setCurrentLayout(name) {
    this.set('previousLayout', this.currentLayout);
    this.set('currentLayout', name);
  }

  revertCurrentLayout() {
    this.set('currentLayout', this.previousLayout || 'base');
  }
}
