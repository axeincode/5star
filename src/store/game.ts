import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Game from "@/interface/game";
import { handleException } from './exception';
import { authStore } from "@/store/auth";
import { appBarStore } from "@/store/appBar";

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
        favoriteGameList: [] as Array<number | string>
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
            if (sameSearchText.length == 0) {
                this.searchTextList.push(searchText);
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
            setAuthModalType(type);
            setOverlayScrimShow(false);
        },
        closeKill() {
            this.betby?.kill();
        },
        setGameBigWinItem(gameBigWinItem: Game.GameBigWinData) {
            this.gameBigWinItem = gameBigWinItem;
        },
        async getGameBetbyInit() {
            this.betby = new BTRenderer().initialize(
                {
                    token: this.enterGameItem.reserve || '',
                    lang: this.language,
                    target: document.getElementById('betby'),
                    brand_id: "2331516940205559808",
                    betSlipOffsetTop: 0,
                    betslipZIndex: 999,
                    themeName: "default",
                    onLogin: () => {
                        this.openDialog('login');
                    },
                    onRegister: () => {
                        this.openDialog('signup');
                    },
                    onTokenExpired: async () => {
                        this.closeKill();
                        await this.dispatchGameEnter({ id: '9999' });
                        await this.getGameBetbyInit();
                    },
                    onSessionRefresh: async () => {
                        this.closeKill();
                        await this.getGameBetbyInit();
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setGameEnterItem(response.data);
                } else {
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, data, next, 1);
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
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
                    this.setErrorMessage(handleException(response.code));
                }
            }
            await network.sendMsg(route, {}, next, 1, 4);
        }
    }
})