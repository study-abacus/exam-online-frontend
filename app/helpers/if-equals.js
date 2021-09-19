import { helper } from "@ember/component/helper";

export default helper(function ifEquals([arg1, arg2]) {
  return arg1 == arg2;
});
