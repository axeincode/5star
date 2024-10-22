//Event Macro Definition
export namespace NETWORK {
  //Login Related News
  export class LOGIN {
    static LOGIN: string = '/login' //Login
    static REGISTER: string = '/register' //Registration
    static QUICK_LOGIN: string = '/quick/login'
    static QUICK_REGISTER: string = '/quick/register'
    static REGISTER_CONFIG: string = '/register/config' //注册配置信息
    static VERIFY_SEND: string = '/verify/send' //发送验证码
    static CLOUDFLARE_VERIFY: string = '/cloudflare/verify' //验证CloudFlare token
  }

  //Business logic after entering the home page
  export class HOME_PAGE {
  }

  // user profile info api config group
  export class PERSONAL_INFO_PAGE {
    static USER_AMOUNT = 'user/amount'; // get user amount
    static USER_INFO = '/user/info'; // get user profile
    static USER_BALANCE = '/user/balance'; // get user balance
    static SET_USER_CURRENCY = '/user/currency'; // set user currency

    static USER_CHANGE = '/user/change'; // update user info
    static USER_EMAIL = '/user/email'; // update email
    static USER_EMAIL_SEND = '/user/email/send'; // Send email verification code
    static USER_EMAIL_SUBMIT = '/user/email/submit'; // Submit email verification code for verification
    static USER_PASSWORD = '/user/password'; // update password
    static USER_SUSPEND = '/user/suspend'; // suspend user
    static USER_CHECK = '/user/check'; // user check
    static USER_EMAIL_VERIFY = '/user/verifyemail'; // user email verify
    static USER_FUNDS_IDENTITY = '/user/funds/identity'; // Get account information in storage
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
    static INVITER_AWARD = '/user/invite/award'; // receive invitation achievement commission
    static INVITE_SELF = '/user/invite/self'; // personal invitation information
    static INVITE_HISTORY_CONFIG = '/user/invite/historycfg'; // invitation event commission record configuration
    static INVITE_HISTORY = '/user/invite/history'; // get invite history
    static STATISTICS_LIST = '/user/invite/statistics/list'; // get agent achievement information
  }

  // achievement api
  export class ACHIEVEMENT_PAGE {
    static ACHIEVEMENT_LIST = '/user/invite/achievement/list';
    static STAGE_AWARD = '/user/invite/stage/achievement/award';
    static ACHIEVEMENT_AWARD = '/user/invite/achievement/award';
    static ACHIEVEMENT_CONFIG = '/invite/achievement/config';
  }

  // game api
  export class GAME_INFO {
    static GAME_CATEGORY = '/games/categories'; // get game category
    static GAME_SEARCH = '/games/search'; // game search
    static GAME_ENTER = '/user/enter/game'; // game enter
    static GAME_BIGWIN = '/games/bigwin'; // Get a list of game awards
    static USER_GAME = '/user/games'; // user game
    static FAVORITE_GAME = '/user/setup/game' // favorite game
    static GAME_HISTORY = '/user/gamehistory' // game history
    static SPINPAGE = '/user/spinpage'  // user spinpage
    static SPIN = '/user/spin'  // user spin
    static FAVORITE_GAME_LIST = '/user/favorite/game';
  }

  // vip api
  export class VIP_INFO {
    static USER_VIP_INFO = '/user/vipinfo'; // vip info
    static USER_VIP_LEVEL = '/viplevels'; // vip levels
    static VIP_TASKS = 'user/viptasks'; // vip tasks
    static VIP_LEVEL_AWARD = '/user/viplevel/award' // vip level award
    static VIP_REBATE_AWARD = '/user/viprebate/award' // vip rebate award
    static VIP_REBATE_HISTORY = '/user/viprebatehistory' // get vip coding record
    static VIP_LEVEL_AWARD_HISTORY = '/user/viplevelawardhistory' // Obtain VIP level reward record
    static VIP_TIMES_HISTORY = '/user/viptimeshistory' // Get VIP weekly and monthly reward records
    static VIP_SIGNIN_REWARDS = '/user/vipsignin/award'; // Receive VIP sign-in rewards
    // static VIP_SIGNIN = '/user/vipsignin'; // Get VIP check-in content
    static VIP_SIGNIN = '/user/vip/signinaward/list';  // Get VIP check-in content  获取签到奖励
    static VIP_SIGNINAWARD_RECEIVE = '/user/vip/signinaward/receive';  // Get sign-in rewards  领取签到奖励
    static VIP_LEVELUP_LIST = '/user/viplevelup/list'; // Get VIP upgrade reward information
    static VIP_LEVELUP_RECEIVE = '/user/viplevelup/receive'; // Receive VIP upgrade rewards
    static USER_VIP_CYCLEAWARD_LIST = '/user/vip/cycleaward/list';  // Get periodic rewards  获取周期性奖励
    static USER_VIP_CYCLEAWARD_RECEIVE = '/user/vip/cycleaward/receive';  // Receive periodic rewards  领取周期性奖励
    static USER_VIP_LEVELAWARD_LIST = '/user/vip/levelaward/list';  // Get level-related rewards  获取等级相关奖励
    static USER_VIP_LEVELAWARD_RECEIVE = '/user/vip/levelaward/receive';  // Receive level-related rewards  领取等级相关奖励
    static USER_VIP_BETAWARD_LIST = '/user/vip/betaward/list';  // Get coding rebates  获取打码返利
    static USER_VIP_BETAWARD_RECEIVE = '/user/vip/betaward/receive';  // Get coding rebates  领取打码返利
    static VIP_SIGNIN_HISTORY = '/user/vipsigninhistory';  //  Get sign-in reward collection records  获取签到奖励领取记录
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
    static BONUS_CANCEL = '/user/bonuses/cancel'
  }

  //Listening events sent actively
  export class UNSOLICITED {}

  // activity api
  export class ACTIVITY {
    static USER_ACTIVITY_LIST = '/activity/list'
  }

  export class Reward{
    static REWARD_LIST = '/user/reward/center/list'; // reward list
    static RECIEVE_ACHIV_BONUS = '/user/reward/center/invite/receive'; // Acheivement Bonus
  }

  export class Banner{
    static BANNER_LIST = '/banner/list'; // banner list
  }

  export class Currency{
    static CURRENCY_LIST = '/user/balance/list'; // currency list
  }

  // phone binding api
  export class PHONE_BIDING {
    static SMS_VERIFICATION_CODE = '/user/sms/send'; // Send SMS verification code
    static SUBMIT_SMS_CODE = '/user/sms/submit'; // Submit SMS verification code for verification
  }

  // collector log api
  export class COLLECTOR_LOG {
    static OPERATE_COLLECTOR_LOG = '/log/collector/new';
  }

  // 下载app活动 api
  export class DOWNLOADAPP {
    static USER_DOWAPP_INFO_ACQUISTION = '/user/downloadapp/list';//下載app送bonus活動信息顯示（登录后）
    static DOWAPP_INFO_ACQUISTION = '/downloadapp/list';//下載app送bonus活動信息顯示（登陆前）
    static DOWAPP_RECEIVE = '/user/downloadapp/receive';
  }

  // 通用 api
  export class COMMON {
    static SERVER_TIMESTAMP = '/timeunix';
  }
}
