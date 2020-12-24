import Route from '@ember/routing/route';
import moment from 'moment';
import { hash } from 'rsvp';

export default class ExamsRoute extends Route {
  model(params) {
    return hash({
      abacusExaminations: this.store.query('examination', {
        filter: {
          registrationEnd: {
            $gt: moment().toISOString()
          },
          type: 'abacus'
        }
      }),
      vedicExaminations: this.store.query('examination', {
        filter: {
          registrationEnd: {
            $gt: moment().toISOString()
          },
          type: 'vedic-maths'
        }
      }),
      englishExaminations: this.store.query('examination', {
        filter: {
          registrationEnd: {
            $gt: moment().toISOString()
          },
          type: 'english'
        }
      })
    });
  }

  setupController(controller, model) {
    controller.set('abacusExaminations', model.abacusExaminations);
    controller.set('vedicExaminations', model.vedicExaminations);
    controller.set('englishExaminations', model.englishExaminations);
  }
}
