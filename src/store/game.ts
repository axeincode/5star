import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Game from "@/interface/game";
import { handleException } from './exception';

export const gameStore = defineStore({
    id: 'game',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        gameCategories: [] as Array<Game.Category>,
        gameSearchList: {} as Game.GameSearchResponse,
        enterGameItem: {
            method: "",
            parames: "",
            provider: "",
            reserve: "",
            weburl: ""
        } as Game.GameEnterResponse,
        searchGameDialogShow: false as boolean,
    }),
    getters: {
        getSuccess: (state) => state.success,
        getErrMessage: (state) => state.errMessage,
        getGameCategories: (state) => state.gameCategories,
        getGameSearchList: (state) => state.gameSearchList,
        getEnterGameItem: (state) => state.enterGameItem,
        getSearchGameDialogShow: (state) => state.searchGameDialogShow
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
        setGameSearchList(gameSearchList: Game.GameSearchResponse) {
            this.gameSearchList = gameSearchList;
        },
        setGameEnterItem(enterGameItem: Game.GameEnterResponse) {
            this.enterGameItem = enterGameItem;
        },
        setSearchGameDialogShow(searchGameDialogShow: boolean) {
            this.searchGameDialogShow = searchGameDialogShow;
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
                    this.setGameSearchList({list: [], total: 0});
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
                    this.setGameSearchList({list: [], total: 0});
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
    }
})