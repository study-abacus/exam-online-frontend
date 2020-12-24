import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class ExamsIdIndexController extends Controller {
  queryParams = ['examAttemptError']
  examAttemptError = null

  @computed('examAttemptError')
  get errorMessage() {
    switch(this.examAttemptError) {
      case 'NO_RECORD_PERMISSION':
        return 'Webcam or Microphone permission not available to start the exam';
    }
  }
}
