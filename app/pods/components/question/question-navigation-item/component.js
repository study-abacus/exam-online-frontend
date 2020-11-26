import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QuestionQuestionNavigationItemComponent extends Component {
  @service store;

  @computed('question.questionAttempt', 'question')
  get questionAttempt() {
    return this
      .store
      .peekAll('question-attempt')
      .filter(questionAttempt => questionAttempt.get('question.id') === this.question.id)
      .firstObject;
  }

  @computed('isCurrentQuestion', 'question', 'questionAttempt')
  get colorClass() {
    //debugger
    if (this.get('questionAttempt.willReview')) {
      return 'bg-warning'
    }

    if (this.questionAttempt && this.questionAttempt.get('answer') !== '') {
      return 'bg-success'
    }

    if (this.isCurrentQuestion) {
      return 'bg-info'
    }

    return 'bg-dark'
  }
}
