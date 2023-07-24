import { defineStore } from 'pinia'
import { type GetMailData } from '@/interface/mail'

export const mailStore = defineStore({
    id: 'mail',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        mailList: [
            {
                id: 1,
                icon: new URL("@/assets/public/svg/icon_public_14.svg", import.meta.url).href,
                mail_content_1: {
                    color: "text-color-white",
                    content: "Subscribe to notifications"
                },
                mail_content_2: {
                    color: "text-color-gray",
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
                mail_content_1: {
                    color: "text-color-white",
                    content: "Refer a friend"
                },
                mail_content_2: {
                    color: "text-color-gray",
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
            {
                id: 3,
                icon: new URL("@/assets/public/svg/icon_public_16.svg", import.meta.url).href,
                mail_content_1: {
                    color: "text-color-gray",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-yellow",
                    content: "ln processing..."
                }
            },
            {
                id: 4,
                icon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
                mail_content_1: {
                    color: "text-color-gray",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-green",
                    content: "Accomplish"
                }
            },
        ] as GetMailData[],
    }),
    getters: {
        getSuccess: (state) => state.success,
        getErrMessage: (state) => state.errMessage,
        getMailList:  (state) => state.mailList,
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
        }
    }
})
