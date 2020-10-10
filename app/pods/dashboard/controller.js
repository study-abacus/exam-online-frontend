import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class DashboardController extends Controller {
  @service store;

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
}
