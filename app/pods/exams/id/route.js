import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdRoute extends Route {
  model(params) {
    return hash({
      examination: this.store.findRecord('examination', params.id),
    });
  }
}
