import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | token-expired', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:token-expired');
    assert.ok(route);
  });
});
