import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExamsIdCurrentExamAttemptRoute extends Route {
  async beforeModel() {
    const { examination } = this.modelFor('exams.id');
    const constraints = {
      video: true
    }
    await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      stream.getTracks().forEach(track => {
        track.stop()
      })
    });
    const vid = await navigator.permissions.query({name: 'camera'})

    if (vid.state !== 'granted') {
      this.transitionTo('exams.id', examination.id, { queryParams: { examAttemptError: 'NO_RECORD_PERMISSION' } })
    }
  }

  async model() {
    const { examination } = this.modelFor('exams.id');
    const examAttempt = examination.examAttempt;
    const questionAttempts = this.store.query('question-attempt', {
      custom: {
        ext: 'url',
        url: `examination/${examination.id}`
      }
    })

    return hash({
      questionAttempts,
      examAttempt
    });
  }
}
