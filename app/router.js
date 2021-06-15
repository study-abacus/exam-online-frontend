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
    this.route('id', { path: '/:id' }, function() {
      this.route('current-exam-attempt', function() {});
      this.route('thank-you');
      this.route('result');
    });
  });
  this.route('verify', { path: 'verify/:token' });
  this.route('forgot-password');
  this.route('reset-password', { path: 'reset-password/:token' });
  this.route('token-expired');
});
