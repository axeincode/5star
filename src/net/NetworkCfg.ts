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
    static USER_BALANCE = '/user/balance'; // get user balance
    static USER_CHANGE = '/user/change'; // update user info
    static USER_EMAIL = '/user/email'; // update email
    static USER_PASSWORD = '/user/password'; // update password
    static USER_SUSPEND = '/user/suspend'; // suspend user
    static USER_CHECK = '/user/check'; // user check
    static USER_EMAIL_VERIFY = '/user/verifyemail'; // user email verify
  }

  // deposit api
  export class DEPOSIT_PAGE {
    static DEPOSIT_CONFIG = '/user/depositcfg'; // get user deposit configuration
    static DEPOSIT_SUBMIT = '/user/depositsubmit'; // user deposit submit
    static DEPOSIT_HISTORY = '/user/deposithistory'; // user deposit history
  }

  // withdraw api
  export class WITHDRAW_PAGE {
    static WITHDRAWAL_CONFIG = '/user/withdrawalcfg'; // get user withdraw configuration
    static WITHDRAWAL_SUBMIT = '/user/withdrawalsubmit'; // user withdraw submit
    static WITHDRAWAL_HISTORY = '/user/withdrawalhistory'; // withdrawal history
    static WITHDRAWAL_REFUND = '/user/withdrawalrefund'; // withdrawal history
  }

  // invite api
  export class INVITE_PAGE {
    static INVITE_INFO = '/user/invite'; // get user invite information
    static INVITER_AWARD = '/user/inviter/award'; // receive invitation achievement commission
    static INVITE_SELF = '/user/invite/self'; // personal invitation information
    static INVITE_HISTORY_CONFIG = '/user/invite/historycfg'; // invitation event commission record configuration
    static INVITE_HISTORY = '/user/invite/history' // 
  }

  // game api
  export class GAME_INFO {
    static GAME_CATEGORY = '/games/categories'; // get game category
    static GAME_SEARCH = '/games/search'; // game search
    static GAME_ENTER = '/user/enter/game'; // game enter
    static USER_GAME = '/user/games'; // user game
    static FAVORITE_GAME = '/user/setup/game' // favorite game
    static GAME_HISTORY = '/user/gamehistory' // game history
  }

  // vip api
  export class VIP_INFO {
    static USER_VIP_INFO = '/user/vipinfo'; // vip info
    static USER_VIP_LEVEL = '/viplevels'; // vip levels
    static VIP_TASKS = 'user/viptasks'; // vip tasks
    static VIP_LEVEL_AWARD = '/user/viplevel/award' // vip level award
  }

  // websocket api
  export class WEB_SOCKET {
    static SOCKET_CONNECT = '/user/connect/websocket'
  }

  // transaction api
  export class TRANSACTION_PAGE {
    static TRANSACTION_HISTORY = '/user/transactionshistory'
  }

  // bonus api
  export class BONUS_PAGE {
    static USER_BONUS = '/user/bonuses';
  }

  //Listening events sent actively
  export class UNSOLICITED {}
}
