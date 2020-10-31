import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class QuestionAttemptComponent extends Component {
  @service api;

  @dropTask
  *answerChange(value) {
    yield this.api.request('/question-attempts', {
      method: 'POST',
      body: JSON.stringify({
        "data": {
          "type": "questionAttempts",
          "attributes": {
              "answer": value
          },
          "relationships": {
            "question": {
              "data": {
                "type": "questions",
                "id": "1"
              }
            }
          }
        }
      })
    })
  }
}
