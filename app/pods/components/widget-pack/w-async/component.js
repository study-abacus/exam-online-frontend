import Component from '@ember/component';
import { and } from '@ember/object/computed';
import { computed } from '@ember/object';
import { next } from '@ember/runloop';

export default class WAsync extends Component {
  fireTrigger = false

  @and('task.isRunning', 'showLoading') isLoading

  @computed('task.lastSuccessful', 'task.lastErrored')
  get result() {
    return this.task.last.isError ? 
      this.task.lastErrored.error : 
      this.task.lastSuccessful?.value
  }

  didReceiveAttrs() {
    if (this.autoFire || this.fireTrigger) {
      this.task.perform()
      next(() => this.set('fireTrigger', false))
    }
  }
}
