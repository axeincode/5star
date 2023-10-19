import type { langType } from "./lang-base";

export const lang: langType = {
  main: {
    signupButton: "Register",
    loginButton: "Login",
    logo_text_1: "BLUE",
    logo_text_2: "GAME",
  },
  login: {
    formPage: {
      header: {
        titleLine1: "Sign in to",
        titleLine2: "your account",
      },
      button: "Sign in",
      forgetPassword: "Forgot Password?",
      donthaveAccount: "Don't have an account yet?",
      createOne: "Create one now!",
    },
    forgotPasswordPage: {
      title: 'Forgot Password ?',
      submit: 'Submit',
      notification: "We've sent you an email with instructions to reset your password",
    },
    submit_result: {
      success_text: "Logined successfully!",
      err_text: "No account linked or password incorrect please try again",
    }
  },
  signup: {
    formPage: {
      header: {
        titleLine1: " Register at ",
        titleLine2: " BLUE.GAME ",
      },
      emailAddress: "Email Address",
      password: "Password",
      validation: {
        email: {
          title: "Please fill in this field",
          title2: "Please enter a validate email",
        },
        password: {
          items: [
            "8-30 Characters in length",
            "Contains one upper and one lowercase character",
            "Contains a number",
            "Contains Special Code",
          ]
        },
      },
      promoCode: "Referral/Promo Code(Optional)",
      agree: {
        prefix: "I agree to the ",
        bold: "User Agreement & confirm ",
        suffix: "I am at least 18 years old",
      },
      agree_alert_text: "Agree to follow the terms",
      alreadyAccount: "Already have an account? ",
      signIn: "Sign in",
      button: "Sign up",
      divider: "OR",
    },
    confirmCancelPage: {
      title: "Are you sure you want to cancel your registration?",
      description: "€200 in deposit bonuses awaits you.",
      continue: "Continue",
      cancel: "Yes, I Want to Cancel",
    },
    alreadyRegisterPage: {
      title: "Looks like you've already registered, sign in now?",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    displayNamePage: {
      title: "Enter a display name",
      username: "Username",
      validation: {
        username: {
          title: "This is the name others will see on Blue.game",
          items: [
            "2-20 characters in length",
            "Nickname must not be like your email",
          ]
        }
      },
      submit: "Submit",
    },
    submit_result: {
      success_text: "Registered successfully!",
    }
  },
  err_result: {
    err_text_1: "failed!",
    err_text_2: "Passed data exception",
    err_text_3: "The password does not meet the requirements",
    err_text_4: "User account is locked",
    err_text_5: "Login data exception",
    err_text_6: "The login account or password is wrong",
    err_text_7: "Login account does not exist",
    err_text_8: "Failed to register data",
    err_text_9: "Registration data exception",
    err_text_10: "Registering an existing account is abnormal",
    err_text_11: "Abnormal nickname format (abnormal length or illegal identifier)",
    err_text_12: "Nickname is the same as email",
    err_text_13: "Email format exception (abnormal length or illegal identifier)",
    err_text_14: "Phone format exception (abnormal length or illegal identifier)",
    err_text_15: "The same password needs to be changed",
    err_text_16: "The current password is wrong",
    err_text_17: "The emails that need to be modified are the same",
    err_text_18: "The message that needs to be modified is already taken",
    err_text_19: "The avatar index that needs to be modified is wrong",
    err_text_20: "wrong birthday format",
  },
  signout: {
    text_1: "Don’t forgot to check out our huge selection of promotions!",
    text_2: "Are you sure you want to logout?",
    text_3: "Don’t forgot to check out our huge selection of casino and sports promotions before you leave!",
    button: "LogOut"
  },
  navBar: {
    casino: 'CASINO',
    sport: 'SPORT',
    my_vip_perks: 'My VIP Perks',
    more: 'More',
    task_text: "TASK",
    unlock_text: "unlocked",
    spin_text: "SPIN",
    live_support: 'Live support',
    earn_free_text: "Earn Free $",
    menu_item_1: {
      promotions: 'Promotions',
      vip_club: 'VIP Club',
      affiliate: 'Affiliate',
      blog: 'Blog',
    },
    casino_sub_menu: {
      recently_played: 'Recently Played',
      favorites: 'Favorites',
      game_originals: 'BLUEGAME Originals',
      slots: 'Slots',
      live_casino: 'Live Casino',
    },
    language: {
      title: 'Language',
      english: 'English',
      portuguese: 'Portuguese',
      espanola: 'Espanola',
    },
    sound_mode: {
      on: 'On',
      off: 'Off',
    }
  },
  rightBar: {
    dropdownItem: {
      casino: 'Casino',
      sport: 'Sport'
    },
    bottom: {
      yourMessage: "Your Message"
    }
  },
  appBar: {
    logo_text_1: "BLUE",
    logo_text_2: "GAME",
    id: "ID",
    account: "Account",
    deposit: "Deposit",
    wager: "Wager",
    bonuses: "Bonuses",
    game_history: "Game History",
    transactions: "Transactions",
    refer_friend: "Refer a friend",
    earn_money: "Earn Money",
    withdraw: "Withdraw",
    install: "Install",
    app: "APP",
    fairness: "Fairness",
    rewards: "Rewards",
    preferences: "Preferences",
    statistics: "Statistics",
    sign_out: "Sign Out",
    vip: {
      bronze: "Bronze",
    }
  },
  home: {
    search: "Search Games Or Providers",
    button: {
      all_game: "All Games",
      favorite: "Favorite",
      recently_played: "Recently Played",
      original_game: "Original Game",
      pg_soft: "PGsoft",
      slots: "Slots",
      live_casino: "Live Casino",
    },
    search_dialog: {
      text_1: "Recommended for you",
      text_2: "No results",
      text_3: "Search requires at least 3 characters",
      text_4: "Original Games",
      text_5: "About",
      text_6: "results",
      search_history: "Search History",
    },
    original_games: "Original Games",
    more: "Load more",
    more_text_1: "Displaying ",
    more_text_2: " of ",
    more_text_3: " games",
    principal: "Principal",
    game_providers: "GAME Providers",
    slots: "Slots",
    live_casino: "Live Casino",
    rank_text: "Rank",
    player_text: "Player",
    profit_text: "Profit",
    game_text: "Game",
    amount_text: "Amount",
    lucky_jackpot_text: "Lucky Jackpot",
    latest_record_text: "Latest Record",
    footer: {
      game: {
        title: "Game",
        menu_1: "Crash",
        menu_2: "Double",
        menu_3: "Mines",
        menu_4: "Dice"
      },
      helpful_links: {
        title: "Helpful Links",
        menu_1: "Fairness",
        menu_2: "VIP Club"
      },
      about_us: {
        title: "ABOUT US",
        menu_1: "Terms of Service",
        menu_2: "Privacy Policy",
        menu_3: "Bonus Terms",
        menu_4: "Welcome Bonus",
        menu_5: "Responsible Gambling",
      },
      footer_4: {
        text: "The blue.game website offers games with an adventure experience directly owned by Pistis Trade N.V., to be a  user of our site you must be 18 years or older. We are not responsible for violating your local laws regarding online gaming. Play responsibly and have fun at blue.game."
      },
      logo: {
        text_1: "Blue.game is operated by Pistis Trade N.V., company registration number 162576, with registered address at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curaçao and is licensed and authorized by the Government of Curacao and operates under the Master License of Gaming Services Provider, N.V. #365/JAZ License Number: GLH-OCCHKTWxxxxxxxxxx.",
        text_2: "Gambling can be addictive. Please play responsibly. Blue.game only accepts customers over 18 years of age."
      },
      footer_6: {
        text: "© 2023 Blue.game All rights reserved."
      }
    }
  },
  mobile_menu: {
    menu: "Menu",
    casino: "Casino",
    share: "Bonus",
    sport: "Sport",
    mail: "Mail",
    reward: "Reward",
    search: "Search"
  },
  deposit_dialog: {
    deposit_info: {
      text_1: "Deposit Information",
      text_2: "1. Scan the QR code bellow in the PIX app",
      text_3: "2. Complete the deposit with your bank",
      text_4: "3. Your ",
      text_5: " balance and any applicabledeposit bonus will be credited",
      text_6: "COPY PIX CODE"
    },
    deposit_currency: "Deposit Currency",
    choose_payment_method: "Choose a Payment Method",
    deposit_amount: "Deposit amount",
    amount: "Amount",
    validation: {
      text_1: "Enter the amount you want to deposit.",
      text_2: "Minimum ",
      text_3: "Maximum ",
    },
    check_text: "Not participating in promotional activities",
    other_text: "0.00% fee,",
    other_text_1: " bonus into your account",
    deposit_btn_text: "DEPOSIT",
    personal_information: {
      header_text: "Enter your Pix details",
      id_text: "ID Number(CPF)",
      first_name: "First Name",
      last_name: "Last Name",
      confirm_text: "Confirm",
      confirm_success_text: "Successfully submitted, need to modify please contact customer service",
      confirm_warning_text: "Please contact customer service to make changes"
    }
  },
  transaction_history: {
    type: {
      text_1: "Game Win",
      text_2: "Game Bet",
      text_3: "Game funds rollback",
      text_4: "Game draw funds",
      text_5: "Deposit",
      text_6: "Withdrawal",
      text_7: "Deposit operation canceled",
      text_8: "Withdrawal operation canceled",
      text_9: "Reward",
      text_10: "Agency commission rebate",
      text_11: "Other operations to increase funds",
      text_12: "Other operations reduce funds",
      text_13: "Increase the amount that can be withdrawn",
      text_14: "Subtract the specified amount that can be withdrawn",
    }
  },
  withdraw_dialog: {
    withdraw_currency: "Withdrawal Currency",
    withdraw_payment_method: "Withdraw to",
    withdraw_amount: "Available Balance: R$ ",
    amount: "Amount",
    validation: {
      text_1: "Enter the amount you want to withdraw. ",
      text_2: "Minimum ",
      text_3: "Maximum ",
    },
    personal_information: {
      header_text: "Enter your Pix details",
      id_text: "ID Number(CPF)",
      first_name: "Fist Name",
      last_name: "Last Name",
      confirm_text: "Confirm",
      confirm_success_text: "Successfully submitted, need to modify please contact customer service",
      confirm_warning_text: "Please contact customer service to make changes"
    },
    text_1: "Withdrawal fee: ",
    text_1_1: "%.",
    text_2: "Free monthly withdrawal amount: 100",
    text_3: "Withdrawal hours: 11:00 - 19:00.",
    text_4: "Payout time: from 5 minutes to 24 hours.",
    other_text: "% fee,R$",
    other_text_1: " into your account",
    withdraw_btn_text: "WITHDRAW",
    withdraw_warning_text: "Excess of withdrawable amount",
  },
  mail_dialog: {
    header_text: "Personal Email"
  },
  affiliate: {
    tab: {
      text_1: "Invite",
      text_2: "Statistics",
      text_3: "Forms"
    },
    invite: {
      invite_partner: "INVITE A PARTNER",
      invited_user: "Invited Users",
      deposit_user: "Deposited Users",
      bonus_today: "Bonus Today",
      bonus_yesterday: "Yesterday's Bonus",
      monthly_revenu_goal: "Monthly revenue goals",
      more_people_text: " more people to invite before the goal is reached",
      premiums_text: "PREMIUMS ISSUED SO FAR",
      invitation_bonus: "Invitation Bonus",
      betting_commision: "Betting Commission",
      how_does_work: "HOW DOES THE INVITATION BONUS WORK?",
      how_does_content_1: "Each deposit user can receive at least ",
      how_does_content_2: " for each invitation. The more people you invite, the higher the invitation bonus for the corresponding level.",
      achivement_bonus: "INVITE ACHIEVEMENT BONUS",
      achivement_bonus_text_1: "When you invite a certain number of recharge users every day, you can unlock the corresponding [Invitation Achievement Reward].",
      agent_realization_text: "Agent Realization ",
      receive_btn_text: "Receive",
      commission_title_text: "HOW TO GET COMMISSION ON YOUR BETS",
      commission_content_text: "This will be your long-term income, and you will receive a different percentage commission each time a player you invite places a bet.",
      invite_text_1: "Bonus rules: All players at the 'Promoter' level receive a percentage of the platform advantage bonus for each bet.",
      invite_text_2: "The proportions of the 3 levels are as follows:",
      invite_text_3_1: "- Level 1: Get ",
      invite_text_3_2: " platform advantage",
      invite_text_4_1: "- Level 2: Get ",
      invite_text_4_2: " platform advantage",
      invite_text_5_1: "- Level 3: Get ",
      invite_text_5_2: " platform advantage",
      invite_text_6: "INCOME CALCULATOR",
      invite_text_7: "Invite ",
      invite_text_8: " active users Expected annual income to be earned",
      invite_text_9: "Are you a blogger with a large audience and many followers? We offer you a partner program with a special referral bonus.",
      invite_text_10: "Please contact our manager to discuss the terms.",
      invite_text_11: "https://wa.me/message/3E5IOHH5J2BCL1",
      invite_text_12: "Important: Only users who have passed the requirements and have been approved by their manager can participate in the program.",
      help_text_1: "The estimated value is derived from the average of all the guest users' earnings within the platform. Your earnings consist of 2 parts, the bonus for inviting Deposited Users, the commission for discounts on the bets of subordinate users, where the value of the lower level user's betting bonus depends on the value of his bets from the lower level user, the more his accumulated betting value, the higher his earnings.",
      help_text_2: "Betting commissions will give you commission income every day. The more level 1 depositors you invite or indirectly invite level 2-3 depositors, the more they bet on games, the more commissions you earn!",
      bonus_dialog: {
        text_1: "The number of invited deposit users is accumulated within 24 hours starting at 00:00 every day. For example, if your number of valid invitations reaches 50, this means that you will receive achievement bonuses in three gradients,",
        text_2: "Cumulative Deposit Users",
        text_3: "Bonus"
      }
    },
    statistics: {
      receive_btn_text: "Receive",
      total_profit_text: "TOTAL PROFIT",
      mobile_profit_title: "PREMIUMS ISSUED SO FAR",
      text_1: "You receive a commission for every bet you invite users to make, win or lose.",
      text_2: "So all you have to do is improve your playing skills, think about how to win the game, and share it with everyone to help more people win with your method.",
      text_3: "We want all players to have fun at BETFIERY, whether it's the fun of winning bets or the game itself!",
      tab: {
        text_1: "PROFIT TODAY",
        text_2: "PROFIT THIS WEEK",
        text_3: "PROFIT THIS MONTH",
        today: {
          profit_today_text: "PROFIT TODAY",
        },
        week: {
          profit_this_week_text: "PROFIT THIS WEEK"
        },
        month: {
          profit_this_month_text: "PROFIT THIS MONTH"
        },
        profit_tab_text_1: "Your profit will consist of two parts, namely [Invitation Bonus] [Betting Commission].",
        profit_tab_text_2: "Betting Commission:",
        profit_tab_text_3: "This will be your main income and you will receive a different percentage of each bet you invite players to place for commission.",
        profit_tab_text_4: "Invitation Bonus:",
        profit_tab_text_5: "The user that you invite to deposit for the first time, you will receive a cash bonus of ",
      }
    },
    forms: {
      table: {
        time: "Time",
        user: "User",
        bonus: "Bonus",
      }
    }
  },
  bonus: {
    title_text: "Your Account balance and bonuses",
    total_text: "Total",
    withdraw_text: "Withdrawal Amount",
    super_bonus_text: "% Supper BONUS",
    bonus_text: "Bonus",
    no_active_text: "No active bonues found",
    table: {
      date: "Date",
      deposit: "Deposit",
      receive: "Receive",
      wager: "Wager requirement"
    },
    dashboard_recharge_title1 : "Recharge now!",
    dashboard_recharge_title2 : "Get Daily Login Bonus",
    dashboard_recharge_content1 : "VIP users who recharge within 7 days wil recive a daily",
    dashboard_recharge_content2 : "login bonus, the higher the VIP level, the bigger the bonus!",
    text_1: "Bonus",
    text_2: "No active bonues found"
  },
  transaction: {
    tab: {
      game_history: "Game History",
      transactions: "Transactions",
      deposit: "Deposit",
      withdrawal: "Withdrawal",
      vip: "VIP",
      referral: "Referral"
    },
    game_history: {
      game: "Game",
      date: "Date",
      amount: "Amount",
      multilier: "Multilier",
      betId: "Betid",
      status: "Status",
      profit: "Profit"
    },
    transactions: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      id: "ID",
      note: "Note",
      balance: "Closing Balance"
    },
    withdraw: {
      action: "Action",
      refund: "Refund"
    }
  },
  account: {
    menu: {
      user_info_text: "User lnformation",
      personal_info_text: "Personal lnfo",
      document_text: "Documents",
      preference_text: "Preferences",
      suspend_account_text: "Suspend Account",
    },
    sub_menu: {
      user_info_text: "Your account details",
      personal_info_text: "Your personal details an contact information",
      document_text: "Upload and verify your documents",
      preference_text: "",
      suspend_account_text: "Suspend your account",
    },
    item: {
      nick_name_text: "Nickname",
      email_text: "Email Address",
      area_text: "Area",
      phone_text: "Phone",
      current_pwd_text: "Current Password",
    },
    back_text: "Back",
    edit_text: "Edit",
    save_text: "Save",
    exist_validation_text: "This nickname already exists, please enter a new one",
    phone_warning_text: "Please contact customer service for modification",
    verify_code_text: "Resend the verification code",
    edit_password_text: "Edit Password",
    edit_nick_name_text: "Edit Nickname",
    edit_email_text: "Edit Email",
    edit_phone_text: "Edit Phone",
    password: {
      current_text: "Current Password",
      new_text: "New Password",
      repeat_text: "Repeat New Password"
    },
    repeat_validation_text: "Repeat password inconsistency",
    suspend_account: {
      help_text: "Temporarily suspend your account from all beting activities for a set duration of time.Warning!once you account has ben suspended you will have to wait out the suspension or contact support to revoke the suspension",
      duration_text: "Duration(Days)",
      minimum_duration_text: "Minimum suspension: 1 day(s)",
      confirm_text: "Confirm",
      dialog: {
        title_text: "Blue.game Show",
        content_text_1: "Are you sure you want to suspend your account for ",
        content_text_2: " days?",
        determine_btn_text: "Determine",
        cancel_btn_text: "Cancel",
      }
    }
  },
  refferal: {
    app_bar_title: "Earn up to $20 per guest deposit user.",
    earn_btn_text: "Earn",
    dialog: {
      header: {
        title_text: "Refer a friend and earn 20 BRL immediately",
        body_text: "Invite Friends, Earn Money",
        body_text_1: " users have already participated in the Invite. New Users campaign and they have earned a combined total of ",
        body_text_2: "BRL in cash rewards on the ",
        body_text_3: " platform.",
        body_text_4: "How invitations work"
      },
      body: {
        text_1: "Share your invite code",
        text_2: "Your Referral Code: ",
        text_3: "(click to copy)",
        copy_btn_text: "Copy link",
      }
    },
    copy_success_text: "Copied to the clipboard.",
    description: {
      text_1: "Invite your friends",
      text_2: "Invite friends who aren't on Blue.game yet. You will receive 20.00 BRL for each friend that signs up and makes a deposit. There's no limit to how many friends you can invite. That means there's also no limit to how much you can earn!",
      term_text: "Terms:",
      text_3: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      back_btn_text: "Back"
    }
  },
  vip: {
    slider: {
      title_text: "My VIP Rating"
    },
    all_bonus_text: "All Bonus",
    cash_back_text: "Cashback",
    super_carousel_text: "Super Carousel",
    welfare_task: "Welfare Tasks",
    reward_text: "Reward available for VIP",
    reward_card_1: {
      daily_free_bonus_text: "Daily Free Bonuses",
      text_1: "Free spin times*",
      text_2: "Available at "
    },
    reward_card_2: {
      vip_week_gift_text: "VIP Week Gift",
      text_1: "VIP Bonus: ",
      text_2: "Free spin times*2",
      text_3: "Collectable after ",
      text_4: " days"
    },
    reward_card_3: {
      vip_month_gift_text: "VIP Month Gift",
      text_1: "VIP Bonus: ",
      text_2: "Free spin times*2",
      text_3: "Collectable after ",
      text_4: " days"
    },
    reward_card_4: {
      vip_upgrage_gift_text: "VIP Upgrade Gift",
      text_1: "VIP Bonus: ",
      text_2: "Free spin times*2",
      text_3: "Available for first upgrade only",
    },
    receive_btn_text: "Receive",
    cashback_body: {
      text_1: "My CASHBACK Bonus",
      text_2: "Get my CASHBACK",
      text_3: "CASHBACK ratio of ",
      text_4: "How to get CASHBACK bonus?",
      text_5: "Next Level VIP ",
      text_7: "Yesterday’s CASHBACK Bonus",
      text_8: "Historical cumulative CASHBACK bonuses",
      text_9: "CASHBACK",
      text_10: " bonus collection records",
      text_11: "Original Games",
      text_12: "SLOT",
      text_13: "SPORTS",
      text_14: "LIVE CASINO",
    },
    super_spin_body: {
      text_1: "My Super Spin",
      text_2: "Number of opportunities left: ",
      text_3: "Spin  Now",
      text_4: " has the possibility of winning he following awards",
      text_5: "See all",
    },
    vip_mission_body: {
      text_1: "My VIP Mission",
      text_2: "Completed ",
      text_3: " today",
      text_4: "Get 10 Crash on $10 x 2.5x win",
      text_5: "Prize: Free spinning wheel*1",
      text_6: "Start",
      text_7: "Ongoing...",
      text_8: "Prize: Free spinning wheel*2",
      text_9: "Prize: Free spinning wheel*3",
      text_10: "VIP Bonus:  R$ 3",
      text_11: "Go to the game",
      text_12: "Receive Reward",
      text_13: "Can start again tomorrow",
      text_15: "VIP 3 can start",
    },
    benifit_description_body: {
      text_1: " all rights and benefits description",
      text_2: "Upgrade Conditions",
      text_3: "Relegation Conditions",
      text_4: "Total deposits",
      text_5: "Total Bets",
      text_6: "VIP Level Reward Pack",
      text_7: "VIP2 Upgrade Bonus",
      text_8: "VIP Weekly Gift Pack",
      text_9: "VIP Monthly Gift Pack",
      text_10: "VIP Cashback Bonus",
      text_11: "Original Games",
      text_12: "Slot",
      text_13: "Sports",
      text_14: "Live Casino",
      text_15: "Free withdrawal amount",
      text_16: "Withdrawal fees",
      text_17: "Withdrawal Benefits"
    },
    footer_body: {
      text_1: "VIP GROUP",
      text_2: "Join our VIP group Get instant access to more  events and bonuses",
      text_3: "Join in now",
    },
    login_bonus: {
      title_text: " Login Bonus",
      day_1_text: "DAY 1",
      day_2_text: "DAY 2",
      day_3_text: "DAY 3",
      day_4_text: "DAY 4",
      day_5_text: "DAY 5",
      day_6_text: "DAY 6",
      day_7_text: "DAY 7",
      day_8_text: "DAY ∞ ",
      footer_text_1: "If you recharge ",
      footer_text_2: "within ",
      footer_text_3: "7 days",
      footer_text_4: "you will get a login bonus",
    },
    roulette_bonus: {
      paid_text: "ROULETTE PAID BOUNS",
      roulette_btn_text: "WHEELS OF LUCK",
      victory_btn_text: "The latest spin victory",
      winner_text: "Winners",
      prize_winner_text: "Grand Prize Winner",
      help_menu: {
        title_text: "Rule",
        text_1: "BETFIERY Lucky Roulette is here!",
        text_2: "Place your bets in the game every day and spin our Lucky Roulette for real cash prizes and the iPhone 14, 1BTC Super Prize!",
        text_3: "Lucky Roulette Rules.",
        text_4: "1. Business hours are 00:00-24:00 every day.",
        text_5: "2. Members may spin Lucky Roulette once for every 1000 BRL wagered in the game, the more bets placed, the more times you win, there is no maximum limit!",
        text_6: "3. Members who win a physical prize (iPhone 14) will receive an internal letter from BETFIERY and a VIP customer service manager will contact the customer to send the prize.",
        text_7: "Terms and Conditions.",
        text_8: "1. Each player may only have one account.",
        text_9: "2. Players who open multiple accounts or impersonate an account will be disqualified from the promotion. Balances may be forfeited and accounts will be blocked.",
        text_10: "3. BETFIERY reserves the right to modify, alter, suspend, cancel, reject or cancel this promotion at its sole discretion.",
      }
    }
  },
  exception: {
    text_1: "failed",
    text_2: "The data passed is abnormal",
    text_3: "",
    text_4: "",
    text_5: "",
    text_6: "",
    text_7: "",
    text_8: "",
    text_9: "",
    text_10: "",
    text_11: "",
    text_12: "",
    text_13: "",
    text_14: "",
    text_15: "",
    text_16: "",
    text_17: "",
    text_18: "",
    text_19: "",
    text_20: "",
    text_21: "",
    text_22: "",
    text_23: "",
    text_24: "",
    text_25: "",
    text_26: "",
    text_27: "",
    text_28: "",
    text_29: "",
    text_30: "",
    text_31: "",
    text_32: "",
    text_33: "",
    text_34: "",
    text_35: "",
    text_36: "",
    text_37: "",
    text_38: "",
    text_39: "",
    text_40: "",
    text_41: "",
    text_42: "",
  }
};