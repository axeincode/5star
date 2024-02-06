import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import type * as SignIn from "@/interface/signin";
import type * as SignUp from "@/interface/signup";
import type * as User from "@/interface/user";
import { Network } from "@/net/Network";
import { NetworkData } from '@/net/NetworkData';
import { Netcfg } from '@/net/NetCfg';
import { handleException } from './exception';

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    authModalType: '' as string,
    dialogCheckbox: false as boolean,
    authDialogVisible: false as boolean,
    signUpForm: false as boolean,
    nickNameDialogVisible: false as boolean,
    token: NetworkData.getInstance().getToken() as string | undefined,
    userInfo: {
      uid: "User6696608024",
      name: "Little Planes",
      email: "anderson.brazstar@gmail.com",
      phone: "+5517991696669",
      avatar: new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href,
    } as User.GetUserInfo,
    userAmount: {
      amount: 111111,
      currency: {
        fiat: true,
        name: "",
        symbol: "R$",
        type: "BRL",
      },
      withdraw: 111111,
      rate: 1000
    }
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getAuthModalType: (state) => state.authModalType,
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
    getUserAmount: (state) => state.userAmount,
    getDialogCheckbox: (state) => state.dialogCheckbox,
    getAuthDialogVisible: (state) => state.authDialogVisible,
    getSignUpForm: (state) => state.signUpForm,
    getNickNameDialogVisible: (state) => state.nickNameDialogVisible
  },
  actions: {
    // set functions
    setAuthModalType(authModalType: string) {
      this.authModalType = authModalType
    },
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setToken(token: string) {
      const networkData: NetworkData = NetworkData.getInstance();
      const netCfg: Netcfg = Netcfg.getInstance();
      networkData.setToken(token);
      netCfg.setToken(token);
      this.token = token;
    },
    removeToken() {
      this.token = undefined;
      const networkData: NetworkData = NetworkData.getInstance();
      networkData.resetData();
      this.userInfo = {
        uid: "User6696608024",
        name: "Little Planes",
        avatar: new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href,
        first_name: "",
        last_name: "",
        id: 0,
        id_number: "",
        email: "",
        email_confirmd: false,
        phone: "",
        phone_confirmd: false,
        date_of_birth: "",
        county: "",
        state: "",
        city: "",
        address: "",
        postal_code: "",
        language: "",
        locale: "",
        initial_profile_complete: false,
        is_supended: 0,
        sys_communications: false,
        locked_personal_info_fields: [],
        create_at: 0
      }
    },
    setUserInfo(userInfo: User.GetUserInfo) {
      this.userInfo = userInfo;
    },
    setUserAmount(userAmount: User.GetUserAmount) {
      this.userAmount = userAmount;
    },
    setDialogCheckbox(dialogCheckbox: boolean) {
      this.dialogCheckbox = dialogCheckbox;
    },
    setAuthDialogVisible(authDialogVisible: boolean) {
      this.authDialogVisible = authDialogVisible;
    },
    setSignUpForm(signUpForm: boolean) {
      this.signUpForm = signUpForm;
    },
    setNickNameDialogVisible (nickNameDialogVisible: boolean) {
      this.nickNameDialogVisible = nickNameDialogVisible;
    },
    // dipatch login
    async dispatchSignIn(msg: SignIn.SigninRequestData) {

      this.setSuccess(false);
      const route: string = NETWORK.LOGIN.LOGIN;
      const network: Network = Network.getInstance();

      // response call back function

      const next = (response: SignIn.GetSigninResponseData) => {
        if (response.code == 200) {
          this.setToken(response.token);
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, msg, next, 1);

    },
    // dipatch signup
    async dispatchSignUp(msg: SignUp.SignupRequestData) {
      this.setSuccess(false);
      const route: string = NETWORK.LOGIN.REGISTER;
      const network: Network = Network.getInstance();

      // response call back function

      const next = (response: SignUp.GetSignupResponseData) => {
        if (response.code == 200) {
          this.setToken(response.token);
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, msg, next, 1);
    },
    // get user info after login or signup
    async dispatchUserProfile() {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_INFO;
      const network: Network = Network.getInstance();

      // response call back function
      const next = (response: User.GetUserInfoResponseData) => {
        if (response.code == 200) {
          if (response.data.avatar == "") {
            response.data.avatar = new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href
          }
          this.setUserInfo(response.data);
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // get user cash info after login or signup
    async dispatchUserAmount() {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_AMOUNT;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserAmountResponseData) => {
        if (response.code == 200) {
          this.setUserAmount(response.data);
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // update user info
    async dispatchUpdateUserInfo(data: any) {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_CHANGE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserInfoResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // update user email
    async dispatchUpdateEmail(data: User.UpdateEmail) {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_EMAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserInfoResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // update user password
    async dispatchUpdatePassword(data: User.UpdatePassword) {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_PASSWORD;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserInfoResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // suspend user
    async dispatchSuspendUser(data: User.UpdateSuspendUser) {
      this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_SUSPEND;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: User.GetUserInfoResponseData) => {
        if (response.code == 200) {
          this.setSuccess(true);
        } else {
          this.setErrorMessage(handleException(response.code));
        }
      }
      await network.sendMsg(route, data, next, 1);
    },
    // dispatch logout function
    dispatchSignout() {
      this.removeToken();
    },
  }
})
