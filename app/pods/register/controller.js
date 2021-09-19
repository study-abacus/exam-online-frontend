import Controller from "@ember/controller";
import { dropTask } from "ember-concurrency-decorators";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";
import { tracked } from "@glimmer/tracking";

export default class RegisterController extends Controller {
  @service api;
  @service session;
  @service currentUser;

  @tracked state = "phone-input";

  @alias("createAccountTask.last") lastResult;

  formData = {
    name: "",
    phone: "",
    otp: "",
  };

  @dropTask
  *sendOtp() {
    yield this.api.request(`/otp/new`, {
      method: "POST",
      body: JSON.stringify({
        phone: this.formData.phone,
      }),
    });
    this.state = "otp-input";
  }

  @dropTask
  *createAccountTask() {
    yield this.api.request("/users", {
      method: "POST",
      body: JSON.stringify({
        ...this.formData,
      }),
    });
    return this.session
      .authenticate("authenticator:jwt", {
        phone: this.formData.phone,
        otp: this.formData.otp,
      })
      .then(() => this.currentUser.load())
      .then(() => {
        this.transitionToRoute("dashboard");
      });
  }
}
