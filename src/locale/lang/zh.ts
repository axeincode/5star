import { langType } from "./lang-base";

export const lang: langType = {
  main: {
    signupButton: "注册",
    loginButton: "登录",
  },
  login: {
    formPage: {
      header: {
        titleLine1: "登录到", 
        titleLine2: "您的帐户",
      },
      button: "登录",
      forgetPassword: "Forgot Password?",
      donthaveAccount: "忘记密码?",
      createOne: "立即创建一个",
    },
    forgotPasswordPage: {
      title: '忘记密码 ?',
      submit: '提交',
      notification: '我们已向您发送一封包含重置密码的说明的电子邮件',
    },
  },
  signup: {
    formPage: {
      header: {
        titleLine1: "请 BLUE.GAME上",
        titleLine2: "注册",
      },
      emailAddress: "邮箱地址",
      password: "密码",
      validation: {
        email: {
          title: "请填写此字段",
          title2: "请输入一个有效的电子邮件",
        },
        password: {
          items: [
            "长度为 8-30 个字符",
            "包含一个大写字母和一个小写字母",
            "包含一个数字",
            "Contains Special Code",
          ]
        },
      },
      promoCode: "推荐/促销代码（可选）",
      agree: {
        prefix: "我同意 ",
        bold: "用户协议 ",
        suffix: "并确认我已年满 18 周岁",
      },
      alreadyAccount: "已有帐户？",
      signIn: "登入",
      button: "注册",
      divider: "或者",
    },
    confirmCancelPage: {
      title: "您确定要取消注册吗？",
      description: "200 欧元的存款红利等着您",
      continue: "继续",
      cancel: "是的，我想取消",
    },
    alreadyRegisterPage: {
      title: "您好象已经注册了，现在登录？",
      confirm: "确认",
      cancel: "取消",
    },
    displayNamePage: {
      title: "输入显示名称",
      username: "用户名",
      validation: {
        username: {
          title: "这是其他人将在 Blue.game 上看到的名称",
          items: [
            "长度为 2-20 个字符",
            "昵称不能跟您的电子邮件一样",
          ]
        }
      },
      submit: "提交",
    },
  }
};