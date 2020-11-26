import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import moment from 'moment';

export default class WidgetPackWFromTimerComponent extends Component {
  @tracked now = moment();

  @computed ('now','args.from')
  get duration () {
    return moment.duration(this.now.diff(this.args.from))
  }

  @computed('duration')
  get days () {
    return Math.floor(this.duration.as('days'))
  }

  @computed('duration')
  get hours () {
    return Math.floor(this.duration.as('hours'))%24
  }

  @computed('duration')
  get minutes () {
    return Math.floor(this.duration.as('minutes'))%60
  }

  @computed('duration')
  get seconds () {
    return Math.floor(this.duration.as('seconds'))%60
  }

  constructor () {
    super(...arguments)
    this.tick()
  }

  tick () {
    this.now = moment();
    later( () => {
      this.tick()
    }, 1000) 
  }
}
