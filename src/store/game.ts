import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Game from "@/interface/game";
import { handleException } from './exception';
import { authStore } from "@/store/auth";
import { appBarStore } from "@/store/appBar";
import Cookies from "js-cookie";
import CacheKey from "@/constants/cacheKey";
import { refferalStore } from "@/store/refferal";

type dialogType = "login" | "signup";

export const gameStore = defineStore({
    id: 'game',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        gameCategories: [] as Array<Game.Category>,
        gameProviders: [] as Array<Game.Category>,
        gameSearchList: {
            list: [],
            total: 0,
        } as Game.GameSearchResponse,
        enterGameItem: {
            method: "",
            parames: "",
            provider: "",
            reserve: "",
            weburl: ""
        } as Game.GameEnterResponse,
        searchGameDialogShow: false as boolean,
        mobileMenuShow: true as boolean,
        searchTextList: [] as Array<string>,
        gameFilterText: "" as string,
        originalGames: [] as Array<Game.Search>,
        gameHistoryItem: {
            total_pages: 0,
            record: []
        } as Game.GameHistoryResponse,
        userSpinPage: {},
        userSpin: {},
        language: localStorage.getItem('lang') || 'en',
        betby: null,
        gameBigWinItem: {
            high_rollers: [],
            lucky_bets: []
        } as Game.GameBigWinData,
        favoriteGameList: [] as Array<number | string>,
        isScroll: true as boolean, // 是否需要打开横屏遮罩监听
    }),
    getters: {
        getSuccess: (state) => state.success,
        getErrMessage: (state) => state.errMessage,
        getGameCategories: (state) => state.gameCategories,
        getGameProviders: (state) => state.gameProviders,
        getGameSearchList: (state) => state.gameSearchList,
        getEnterGameItem: (state) => state.enterGameItem,
        getSearchGameDialogShow: (state) => state.searchGameDialogShow,
        getSearchTextList: (state) => state.searchTextList,
        getGameFilterText: (state) => state.gameFilterText,
        getOriginalGames: (state) => state.originalGames,
        getMobileMenuShow: (state) => state.mobileMenuShow,
        gameHistoryItem: (state) => state.gameHistoryItem,
        getUserSpinPage: (state) => state.userSpinPage,
        getUserSpin: (state) => state.userSpin,
        getLanguage: (state) => state.language,
        getGameBigWinItem: (state) => state.gameBigWinItem,
        getFavoriteGameList: (state) => state.favoriteGameList,
        getIsScroll: (state) => state.isScroll,
    },
    actions: {
        // set functions
        setSuccess(success: boolean) {
            this.success = success
        },
        // 设置是否显示横屏遮罩层
        setIsScroll(param: boolean) {
            this.isScroll = param
        },
        setErrorMessage(message: string) {
            this.errMessage = message
        },
        setGameCategories(gameCategories: Array<Game.Category>) {
            this.gameCategories = gameCategories;
        },
        setGameProviders(gameProviders: Array<Game.Category>) {
            this.gameProviders = gameProviders;
        },
        setGameSearchList(gameSearchList: Game.GameSearchResponse) {
            this.gameSearchList = gameSearchList;
        },
        setGameEnterItem(enterGameItem: Game.GameEnterResponse) {
            this.enterGameItem = enterGameItem;
        },
        setSearchGameDialogShow(searchGameDialogShow: boolean) {
            this.searchGameDialogShow = searchGameDialogShow;
        },
        setSearchTextList(searchText: string) {
            let sameSearchText = this.searchTextList.filter(item => item == searchText)
            console.log(sameSearchText, 'sameSearchTextsameSearchTextsameSearchTextsameSearchText');
            
            if (sameSearchText.length == 0) {
                this.searchTextList.push(searchText);
                // 过滤掉['']空数据情况
                this.searchTextList = this.searchTextList.filter(item => item !== "");
            }
        },
        removeSearchTextList(index: number) {
            this.searchTextList.splice(index, 1);
        },
        removeAllSearchTextList() {
            this.searchTextList = [];
        },
        setGameFilterText(gameFilterText: string) {
            this.gameFilterText = gameFilterText
        },
        setOriginalGames(originalGames: Array<Game.Search>) {
            this.originalGames = originalGames
        },
        setMobileMenuShow(mobileMenuShow: boolean) {
            this.mobileMenuShow = mobileMenuShow;
        },
        setGameHistoryItem(gameHistoryItem: Game.GameHistoryResponse) {
            this.gameHistoryItem = gameHistoryItem;
        },
        setUserSpinPage(userSpinPage: any) {
            this.userSpinPage = userSpinPage
        },
        setUserSpin(userSpin: any) {
            this.userSpin = userSpin
        },
        setLanguage(lang: string) {
            this.language = lang;
        },
        setFavoriteGameList(favoriteGameList: Array<number | string>) {
            this.favoriteGameList = favoriteGameList
        },
        openDialog(type: dialogType) {
            const { setAuthModalType } = authStore();
            const { setOverlayScrimShow } = appBarStore();
            const { setAuthDialogVisible } = authStore();
            setAuthModalType(type);
            setAuthDialogVisible(true);
            setOverlayScrimShow(false);
        },
        openDepositDialog() {
            const { setDepositWithdrawToggle } = appBarStore();
            const { setNavBarToggle } = appBarStore();
            const { setUserNavBarToggle } = appBarStore();
            const { setDepositDialogToggle } = appBarStore();
            const { setCashDialogToggle } = appBarStore();
            setDepositWithdrawToggle(true);
            setNavBarToggle(false);
            setUserNavBarToggle(false);
            setDepositDialogToggle(true);
            setCashDialogToggle(true);
        },
        closeKill() {
            (this.betby as any)?.kill();
        },
        setGameBigWinItem(gameBigWinItem: Game.GameBigWinData) {
            this.gameBigWinItem = gameBigWinItem;
        },
        updateOptionsBy(options:any){
            (this.betby as any)?.updateOptions(options);
        },
        async getGameBetbyInit() {
            const { setRefferalAppBarShow } = refferalStore();
            setRefferalAppBarShow(false)
            await this.dispatchGameEnter({ id: '9999', demo: false });
            this.betby = new BTRenderer().initialize(
                {
                    token: this.enterGameItem.reserve || '',
                    lang: this.language,
                    target: document.getElementById('betby'),
                    brand_id: "2331516940205559808",
                    betSlipOffsetTop: 0,
                    betslipZIndex: 999,
                    stickyTop: 0,
                    themeName: "demo-green-dark-table",
                    onLogin: async () => {
                        if (Cookies.get(CacheKey.TOKEN) == "" || !Cookies.get(CacheKey.TOKEN)) {
                            this.openDialog('login');
                        } else {
                            this.closeKill();
                            await this.getGameBetbyInit();
                        }
                    },
                    onRegister: () => {
                        this.openDialog('signup');
                    },
                    onTokenExpired: async () => {
                        // this.closeKill();
                        // await this.getGameBetbyInit();
                        await this.dispatchGameEnter({ id: '9999', demo: false });
                        return this.enterGameItem.reserve;
                    },
                    onSessionRefresh: async () => {
                        this.closeKill();
                        await this.getGameBetbyInit();
                    },
                    onRecharge: () => {
                        this.openDepositDialog();
                    },
                    onRouteChange:()=>{
                        console.log('路由切换','onRouteChangeonRouteChangeonRouteChangeonRouteChange')
                    }
                });
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
                    if (sub_api == "?type=providers") {
                        this.setGameProviders(response.data);
                    } else {
                        this.setGameCategories(response.data);
                    }
                } else {
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
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
                    this.setGameSearchList({ list: [], total: 0 });
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // user game api
        async dispatchUserGame(data: Game.GameUserBody) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.USER_GAME;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameSearchResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setGameSearchList(response.data);
                } else {
                    this.setGameSearchList({ list: [], total: 0 });
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, data, next, 1, 4);
        },
        // favorite game api
        async dispatchFavoriteGame(data: any) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.FAVORITE_GAME;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: any) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                } else {
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, data, next, 1);
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
                    this.setErrorMessage("");
                    this.setGameEnterItem(response.data);
                } else {
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, data, next, 1);
        },
        async dispatchGameEnterRequest(data: Game.GameEnterBody) {
            const route: string = NETWORK.GAME_INFO.GAME_ENTER;
            const network: Network = Network.getInstance();
            return new Promise(async (resolve, reject) => {
                network.request({
                    url: route,
                    method: 'POST',
                    data
                }).then((response:any )=> {
                    if (response.code == 200) {
                        resolve(response.data)
                    } else {
                        reject(response)
                    }
                }).catch((err:any) => {
                    reject(err)
                })
            })
        },
        // game history api response
        async dispatchGameHistory(data: any) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.GAME_HISTORY;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameHistoryResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setGameHistoryItem(response.data);
                } else {
                    // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, data, next, 1);
        },
        // user spinpage api
        async dispatchUserSpinPage(data: any) {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.SPINPAGE;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: any) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setUserSpinPage(response.data);
                } else {
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // user spin api
        async dispatchUserSpin() {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.SPIN;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: any) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setUserSpin(response.data);
                } else {
                    // this.setErrorMessage(handleException(response.code));
          this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, {}, next, 1);
        },
        // Get a list of game awards
        async dispatchGameBigWin() {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.GAME_BIGWIN;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameBigWinResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setGameBigWinItem(response.data);
                } else {
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        },
        // Get a list of game awards
        async dispatchGameFavoriteList() {
            this.setSuccess(false);
            const route: string = NETWORK.GAME_INFO.FAVORITE_GAME_LIST;
            const network: Network = Network.getInstance();
            // response call back function
            const next = (response: Game.GetGameFavoriteListResponse) => {
                if (response.code == 200) {
                    this.setSuccess(true);
                    this.setFavoriteGameList(response.data);
                } else {
                    // this.setErrorMessage(handleException(response.code));
                    this.setErrorMessage(response.message);
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        }
    }
})
