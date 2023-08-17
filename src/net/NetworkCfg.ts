//Event Macro Definition
export namespace NETWORK {
  //Login Related News
  export class LOGIN {
    static LOGIN: string = '/login' //Login
    static REGISTER: string = '/register' //Registration
  }

  //Business logic after entering the home page
  export class HOME_PAGE {
  }

  // user profile info api config group
  export class PERSONAL_INFO_PAGE {
    static USER_AMOUNT = 'user/amount'; // get user amount
    static USER_INFO = '/user/info'; // get user profile
    static USER_CHANGE = '/user/change'; // update user info
    static USER_EMAIL = '/user/email'; // update email
    static USER_PASSWORD = '/user/password'; // update password
    static USER_SUSPEND = '/user/suspend'; // suspend user
    static USER_CHECK = '/user/check'; // user check
    static USER_EMAIL_VERIFY = '/user/verifyemail'; // user email verify
    static USER_DEPOSIT_CONFIG = '/user/depositcfg'; // get user deposit configuration
    static USER_DEPOSIT_SUBMIT = '/user/depositsubmit'; // user deposit submit
  }

  //Listening events sent actively
  export class UNSOLICITED {}
}
