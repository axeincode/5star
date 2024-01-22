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
            {
                id: 3,
                icon: new URL("@/assets/public/svg/icon_public_16.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-yellow text-600-10",
                    content: "ln processing..."
                }
            },
            {
                id: 4,
                icon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-green text-600-10",
                    content: "Accomplish"
                }
            },
            {
                id: 5,
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
                id: 6,
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
            {
                id: 7,
                icon: new URL("@/assets/public/svg/icon_public_16.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-yellow text-600-10",
                    content: "ln processing..."
                }
            },
            {
                id: 8,
                icon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-green text-600-10",
                    content: "Accomplish"
                }
            },
            {
                id: 9,
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
                id: 10,
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
            {
                id: 11,
                icon: new URL("@/assets/public/svg/icon_public_16.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-yellow text-600-10",
                    content: "ln processing..."
                }
            },
            {
                id: 12,
                icon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-green text-600-10",
                    content: "Accomplish"
                }
            },
            {
                id: 13,
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
                id: 14,
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
            {
                id: 15,
                icon: new URL("@/assets/public/svg/icon_public_16.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-yellow text-600-10",
                    content: "ln processing..."
                }
            },
            {
                id: 16,
                icon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
                offset: 0,
                mail_content_1: {
                    color: "text-color-gray text-500-12",
                    content: "Withdrawal Amount"
                },
                mail_content_2: {
                    color: "money-color-white text-700-16",
                    content: "$100.00"
                },
                mail_rail_1: {
                    color: "text-color-gray text-500-10",
                    content: "2023/1/29  17:50:36"
                },
                mail_rail_2: {
                    color: "text-color-green text-600-10",
                    content: "Accomplish"
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
