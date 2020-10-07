import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'exam-online-frontend/mixins/authenticated-route-mixin';

const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin);

export default class DashboardRoute extends AuthenticatedRoute {
}
