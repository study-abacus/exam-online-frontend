import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class ExamAttemptVideoRecorderComponent extends Component {
  @service api;

  stream = null;

  @dropTask
  *videoPingTask() {
    while(true) {
      try {
        yield timeout(3000);
        const track = this.stream.getTracks()[0];
        const imageCapture = new ImageCapture(track);
        const frame = yield imageCapture.takePhoto({
          // imageHeight: 1280,
        });
        console.log(frame)

        const response = yield this.api.request(`/exam-attempts/${this.examAttempt.id}/videoPing`, {
          method: 'POST',
          body: '{}'
        })
        yield fetch(response.url, {
          method: 'PUT',
          body: frame
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  didInsertElement() {
    const constraints = {
      video: true
    }
    const el = document.getElementById('recorder');
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      el.srcObject = stream;
      this.set('stream', stream);
    });
  }

  didReceiveAttrs() {
    this.videoPingTask.perform();
  }

  willDestroyElement() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop()
      })
    }
    this.videoPingTask.cancelAll();
  }
}
