import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import ENV from 'exam-online-frontend/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  host = ENV.apiHost
  namespace = 'api'

  get headers() {
    if (this.session.isAuthenticated) {
      const { jwt } = this.get('session.data.authenticated');
      return {
        Authorization: `JWT ${jwt}`
      };
    }

    return {};
  }

  async findRecord(store, type, id, snapshot) {
    const result = await super.findRecord(...arguments);
    debugger
    return result
  }
  
  urlForQueryRecord(query) {
    if(query.custom) {
      switch (query.custom.ext){
        case 'url': {
          let url =  query.custom.url;
          delete query.custom;
          return `${super.urlForQueryRecord(...arguments)}/${url}`;
        }
      }
    } else  {
      return super.urlForQueryRecord(...arguments);
    }
  }

  urlForQuery(query) {
    if(query.custom) {
      switch (query.custom.ext) {
        case 'url': {
          let url =  query.custom.url;
          delete query.custom;
          return `${super.urlForQuery(...arguments)}/${url}`;
        }
      }
    } else  {
      return super.urlForQuery(...arguments);
    }
  }
}
