import Component from '@ember/component';

export default class ExamAttemptVideoRecorderComponent extends Component {
  stream = null;

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

  willDestroyElement() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop()
      })
    }
  }
}
