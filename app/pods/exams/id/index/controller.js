import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ExamsIdIndexController extends Controller {
  @action
  onEnd() {
    console.log("ended");
  }
}
