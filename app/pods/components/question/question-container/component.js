import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';

export default class QuestionQuestionContainerComponent extends Component {
  @service api;
  @service store;

  answer = '';

  didReceiveAttrs() {
    this.question.get('questionAttempt').then(questionAttempt => {
      if (questionAttempt === null) {
        this.set('answer', '');
        return;
      }
      this.set('answer', questionAttempt.get('answer'));
    })
  }

  @computed('question.type')
  get questionInputComponent() {
    switch(this.question.type) {
      case 'mcq': return 'question/question-container/mcq-question';
      default: return 'question/question-container/text-question';
    }
  }

  @computed('markAnswerTask.isRunning')
  get saveButtonText() {
    if (this.markAnswerTask.isRunning) {
      return 'Saving'
    }

    return 'Save and Next'
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
