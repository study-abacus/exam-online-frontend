import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdRoute extends Route {
  model(params) {
    return hash({
      examinationData: this.store.findRecord('examination', params.id),
    });
  }
}
