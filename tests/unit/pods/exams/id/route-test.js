import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | exams/id', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:exams/id');
    assert.ok(route);
  });
});
