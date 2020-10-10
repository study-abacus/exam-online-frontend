import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import moment from 'moment';

export default class DashboardController extends Controller {
  @service store;
  @service currentUser;

  currentProfileView = 'view'

  @restartableTask
  *fetchExamAttemptsTask() {
    return this.store.query('exam-attempt', {
      filter: {
        start: {
          $gt: moment().toISOString()
        }
      }
    });
  }

  @action
  toggleProfileView() {
    if (this.currentProfileView === 'view') {
      return this.set('currentProfileView', 'edit');
    }

    return this.set('currentProfileView', 'view');
  }
}
