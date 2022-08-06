//登录和注册表单项验证的通用代码
class FieldValidator {
  /**
   *
   * @param {String} txtId
   * @param {Function} validatorFunc
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }
  //失去焦点，表单提交
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  /**
   *
   * @param  {...FieldValidator} validators
   */
  static async validate(...validators) {
    const proms = validators.map((item) => item.validate());
    const results = await Promise.all(proms);
    return results.every((item) => item);
  }
}
