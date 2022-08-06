const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空";
  }

  const resp = await API.exists(val);
  if (resp.data) {
    return "账号已存在";
  }
});

const nicknameValidator = new FieldValidator("txtNickname", async function (
  val
) {
  if (!val) {
    return "昵称不能为空";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "密码不能为空";
  }
});

const txtLoginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  async function (val) {
    if (!val) {
      return "密码不能为空";
    }
    if (val !== loginPwdValidator.input.value) {
      return "两次密码不一致";
    }
  }
);

const form = $(".user-form");
form.onsubmit = async (e) => {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    txtLoginPwdConfirmValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert("注册成功，点击确定跳转到登陆页面");
    location.href = "./login.html";
  }
};
