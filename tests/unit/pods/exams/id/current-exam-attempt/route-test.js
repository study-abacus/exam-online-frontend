import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | exams/id/current-exam-attempt', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:exams/id/current-exam-attempt');
    assert.ok(route);
  });
});
