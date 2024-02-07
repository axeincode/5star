import { defineStore } from 'pinia'
import { type GetMailData } from '@/interface/mail'
import { handleException } from './exception';

export const mailStore = defineStore({
    id: 'mail',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        mailList: [
            {
                id: 1,
                icon: new URL("@/assets/public/svg/icon_public_14.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-white text-500-12",
                    content: "Subscribe to notifications"
                },
                mail_content_2: {
                    color: "text-color-gray text-500-10",
                    content: "Enable push notifications to receive exclusive bonuses!"
                },
                mail_rail_1: {
                    color: "",
                    content: ""
                },
                mail_rail_2: {
                    color: "",
                    content: ""
                }
            },
            {
                id: 2,
                icon: new URL("@/assets/public/svg/icon_public_15.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-white text-500-12",
                    content: "Refer a friend"
                },
                mail_content_2: {
                    color: "text-color-gray text-500-10",
                    content: "lnvite Friends, Earn $10 Per lnvite"
                },
                mail_rail_1: {
                    color: "",
                    content: ""
                },
                mail_rail_2: {
                    color: "",
                    content: ""
                }
            },
        ] as GetMailData[],
        mailMenuShow: false as boolean,
        mobileMenuMailToggle: false as boolean,
    }),
    getters: {
        getSuccess: (state) => state.success,
        getErrMessage: (state) => state.errMessage,
        getMailList: (state) => state.mailList,
        getMailMenuShow: (state) => state.mailMenuShow,
        getMobileMenuMailToggle: (state) => state.mobileMenuMailToggle
    },
    actions: {
        setSuccess(success: boolean) {
            this.success = success
        },
        setErrorMessage(message: string) {
            this.errMessage = message
        },
        setMailList(mailItem: GetMailData) {
            this.mailList.unshift(mailItem);
        },
        setMailMenuShow(mailMenuShow: boolean) {
            this.mailMenuShow = mailMenuShow;
        },
        setMobileMenuMailToggle(mobileMenuMailToggle: boolean) {
            this.mobileMenuMailToggle = mobileMenuMailToggle;
        }
    }
})
