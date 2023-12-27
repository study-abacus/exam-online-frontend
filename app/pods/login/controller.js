// import Controller from "@ember/controller";
// import { dropTask } from "ember-concurrency-decorators";
// import { inject as service } from "@ember/service";
// import { action, computed } from "@ember/object";
// import { tracked } from "@glimmer/tracking";

// export default class LoginController extends Controller {
//   @service session;
//   @service currentUser;
//   @service api;

//   @tracked state = "phone-input";

//   phone = "";
//   otp = "";

//   @dropTask
//   *sendOtp() {
//     yield this.api.request(`/password/`, {
//       method: "POST",
//       body: JSON.stringify({
//         phone: this.phone,
//       }),
//     });
//     this.state = "otp-input";
//   }

//   @dropTask
//   *login() {
//     yield this.session.authenticate("authenticator:jwt", {
//       phone: this.phone,
//       otp: this.otp,
//     });
//     yield this.currentUser.load();
//     this.transitionToRoute("dashboard");
//   }
// }

// Updated controller.js
// Updated controller.js
import Controller from "@ember/controller";
import { dropTask } from "ember-concurrency-decorators";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @service session;
  @service currentUser;
  @service api;

  @tracked state = "username-input";

  username = "";
  password = "";

  @dropTask
  *login() {
      yield this.session.authenticate("authenticator:jwt", {
        username: this.username,
        password: this.password,
      });
      yield this.currentUser.load();
      this.transitionToRoute("dashboard");
  }
}
