import EmberRouter from '@ember/routing/router';
import config from 'exam-online-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('register');
  this.route('login');
  this.route('dashboard');
  this.route('exams', function() {
    this.route('id', { path: '/:id' });
  });
  this.route('verify', { path: 'verify/:token' });
});
