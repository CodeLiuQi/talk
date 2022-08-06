const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "密码不能为空";
  }
});

const form = $(".user-form");
form.onsubmit = async (e) => {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const resp = await API.login(data);
  if (resp.code === 0) {
    alert("登录成功，点击确定跳转到首页");
    location.href = "./index.html";
  } else {
    loginIdValidator.p.innerText = `${resp.msg}`;
    loginPwdValidator.input.value = "";
  }
};
