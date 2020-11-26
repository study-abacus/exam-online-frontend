import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';

export default class QuestionQuestionContainerComponent extends Component {
  @service api;
  @service store;

  answer = '';

  didReceiveAttrs() {
    this.set('answer', this.question.get('questionAttempt.answer'));
  }

  @dropTask
  *markAnswerTask(answer) {
    const questionAttempt = yield this.question.questionAttempt;

    if (questionAttempt) {
      questionAttempt.answer = answer;
      yield questionAttempt.save();
      yield questionAttempt.reload();
    } else {
      const newQuestionAttempt = this.store.createRecord('question-attempt', {
        answer,
        question: this.question
      })
      yield newQuestionAttempt.save();
      yield newQuestionAttempt.reload();
    }

    if (this.onAfterAnswer) {
      this.onAfterAnswer();
    }
  }

  @dropTask
  *toggleReviewTask() {
    const questionAttempt = yield this.question.questionAttempt;

    if (questionAttempt) {
      questionAttempt.willReview = !questionAttempt.willReview
      yield questionAttempt.save();
      return questionAttempt.reload();
    } else {
      const newQuestionAttempt = this.store.createRecord('question-attempt', {
        answer: '',
        willReview: true,
        question: this.question
      })
      yield newQuestionAttempt.save();
      return newQuestionAttempt.reload();
    }
  }
}
