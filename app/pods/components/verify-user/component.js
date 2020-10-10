import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class VerifyUserComponent extends Component {
  @service api;

  @dropTask
  *sendVerificationLinkTask() {
    yield this.api.request('/users/me/verify', {
      method: 'POST',
      body: JSON.stringify({})
    })

    yield timeout(60000);
  }
}
