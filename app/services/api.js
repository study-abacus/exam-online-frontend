import FetchService from 'ember-fetch-service/services/fetch';
import { inject as service } from '@ember/service';
import ENV from 'exam-online-frontend/config/environment';


export class ApiError extends Error {
  constructor({ title, detail, code }) {
    super();
    this.title = title;
    this.detail = detail;
    this.code = code;
  }
}

export default class ApiService extends FetchService {
  @service session;

  get headers() {
    if (this.session.isAuthenticated) {
      const { jwt } = this.get('session.data.authenticated');
      return {
        'Content-Type': 'application/json',
        Authorization: `JWT ${jwt}`
      };
    }

    return {
      'Content-Type': 'application/json',
    };
  }

  request(url, opts, throwError = true) {
    return this
      .fetch(ENV.apiHost + '/api' + url, opts)
      .then(async resp => {
        if (!resp.ok && throwError) {
          const error_payload = (await resp.json()).errors[0]
          throw new ApiError({
            title: error_payload.title,
            code: error_payload.code,
            detail: error_payload.detail
          })
        }

        return resp;
      })
      .then(resp => resp.status === 204 ? resp : resp.json())
  }
}
