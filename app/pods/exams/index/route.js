import Route from '@ember/routing/route';
import moment from 'moment';
import { hash } from 'rsvp';

export default class ExamsRoute extends Route {
  queryParams = {
    q: {
      refreshModel: true
    }
  };

  model(params) {
    return hash({
      examinations: this.store.query('examination', {
        filter: {
          start: {
            $gt: moment().toISOString()
          },
          title: {
            $iLike: `%${params.q}%`
          }
        }
      })
    });
  }

  setupController(controller, model) {
    controller.set('examinations', model.examinations);
  }
}
