import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Game from "@/interface/game";

export const gameStore = defineStore({
    id: 'game',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        gameCategories: [] as Array<Game.Category>,
        gameSearchList: [] as Array<Game.Search>,
        enterGameItem: {
            method: "",
            parames: "",
            provider: "",
            reserve: "",
            weburl: ""
        } as Game.GameEnterResponse
    }),
    getters: {
        getSuccess: (state) => state.success,
        getErrMessage: (state) => state.errMessage,
        getGameCategories: (state) => state.gameCategories,
        getGameSearchList: (state) => state.gameSearchList,
        getEnterGameItem: (state) => state.enterGameItem
    },
    actions: {
        // set functions
        setSuccess(success: boolean) {
            this.success = success
        },
        setErrorMessage(message: string) {
            this.errMessage = message
        },
        setGameCategories(gameCategories: Array<Game.Category>) {
            this.gameCategories = gameCategories;
        },
        setGameSearchList(gameSearchList: Array<Game.Search>) {
            this.gameSearchList = gameSearchList;
        },
        setGameEnterItem(enterGameItem: Game.GameEnterResponse) {
            this.enterGameItem = enterGameItem;
        },
        // game categories api
        async dispatchGameCategories(sub_api: string) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.GAME_CATEGORY + sub_api;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameCategoriesResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setGameCategories(response.data);
                } else {
                    this.handleErr(response.code);
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // game search api
        async dispatchGameSearch(sub_api: string) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.GAME_SEARCH + sub_api;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameSearchResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setGameSearchList(response.data);
                } else {
                    this.handleErr(response.code);
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // game enter api
        async dispatchGameEnter(data: Game.GameEnterBody) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.GAME_ENTER;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameEnterResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setGameEnterItem(response.data);
                } else {
                    this.handleErr(response.code);
                }
            }
            await network.sendMsg(route, data, next, 1);
        },
        // error handle function
        handleErr(code: number) {
            switch (code) {
                case 0:
                    // code === 0 means failed
                    this.setErrorMessage('failed');
                    break;
                case 100000:
                    // code === 100000 means Passed data exception
                    this.setErrorMessage('Passed data exception');
                    break;
                case 100001:
                    // code === 100001 means The password does not meet the requirements
                    this.setErrorMessage('The password does not meet the requirements');
                    break;
                case 100002:
                    // code === 100002 User account is locked
                    this.setErrorMessage('User account is locked');
                    break;
                case 101001:
                    // code === 200 means Login data exception
                    this.setErrorMessage('Login data exception');
                    break;
                case 101002:
                    // code === 200 means The login account or password is wrong
                    this.setErrorMessage('The login account or password is wrong');
                    break;
                case 101003:
                    // code === 101003 means Login account does not exist
                    this.setErrorMessage('Login account does not exist');
                    break;
                case 102001:
                    // code === 102001 means Failed to register data
                    this.setErrorMessage('Failed to register data');
                    break;
                case 102002:
                    // code === 102002 means Registration data exception
                    this.setErrorMessage('Registration data exception');
                    break;
                case 102003:
                    // code === 102003 means Registering an existing account is abnormal
                    this.setErrorMessage('Registering an existing account is abnormal');
                    break;
                case 103001:
                    // code === 103001 means Abnormal nickname format (abnormal length or illegal identifier)
                    this.setErrorMessage('Abnormal nickname format (abnormal length or illegal identifier)');
                    break;
                case 103002:
                    // code === 103002 means Nickname is the same as email
                    this.setErrorMessage('Nickname is the same as email');
                    break;
                case 103003:
                    // code === 103003 means Email format exception (abnormal length or illegal identifier)
                    this.setErrorMessage('Email format exception (abnormal length or illegal identifier)');
                    break;
                case 103004:
                    // code === 103004 means Phone format exception (abnormal length or illegal identifier)
                    this.setErrorMessage('Phone format exception (abnormal length or illegal identifier)');
                    break;
                case 103005:
                    // code === 103005 means The same password needs to be changed
                    this.setErrorMessage('The same password needs to be changed');
                    break;
                case 103006:
                    // code === 103006 means The current password is wrong
                    this.setErrorMessage('The current password is wrong');
                    break;
                case 103007:
                    // code === 103007 means The emails that need to be modified are the same
                    this.setErrorMessage('The emails that need to be modified are the same');
                    break;
                case 103008:
                    // code === 103008 means The message that needs to be modified is already taken
                    this.setErrorMessage('The message that needs to be modified is already taken');
                    break;
                case 103009:
                    // code === 103009 means The avatar index that needs to be modified is wrong
                    this.setErrorMessage('The avatar index that needs to be modified is wrong');
                    break;
                case 103010:
                    // code === 103010 means wrong birthday format
                    this.setErrorMessage('wrong birthday format');
                    break;
                case 106003:
                    // code === 106003 means passed data exception
                    // this.setErrorMessage('传递的数据异常');
                    this.setErrorMessage('passed data exception');
                    break;
                case 401:
                    // code === 401 means token contains an invalid number of segments
                    this.setErrorMessage('token contains an invalid number of segments');
                    this.setGameEnterItem({
                        method: "",
                        parames: "",
                        provider: "",
                        reserve: "",
                        weburl: ""
                    })
                    break;
            }
        },
    }
})
