import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  urlForUpdateRecord() {
    return `${this.host}/${this.namespace}/users/me`
  }
}
