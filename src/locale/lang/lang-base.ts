export type langType = {
  main: {
    signupButton: string,
    loginButton: string,
    logo_text_1: string,
    logo_text_2: string,
  },
  login: {
    formPage: {
      header: {
        titleLine1: string,
        titleLine2: string,
      },
      button: string,
      forgetPassword: string,
      donthaveAccount: string,
      createOne: string,
    },
    forgotPasswordPage: {
      title: string,
      submit: string,
      notification: string,
    },
    submit_result: {
      success_text: string
      err_text: string
    }
  }
  signup: {
    formPage: {
      header: {
        titleLine1: string,
        titleLine2: string,
      },
      emailAddress: string,
      password: string,
      validation: {
        email: {
          title: string,
          title2: string,
        },
        password: {
          items: [
            string,
            string,
            string,
            string,
          ]
        },
      },
      promoCode: string,
      agree: {
        prefix: string,
        bold: string,
        suffix: string,
      },
      agree_alert_text: string
      alreadyAccount: string,
      signIn: string,
      button: string,
      divider: string,
    },
    confirmCancelPage: {
      title: string,
      description: string,
      continue: string,
      cancel: string,
    },
    alreadyRegisterPage: {
      title: string,
      confirm: string,
      cancel: string,
    },
    displayNamePage: {
      title: string,
      username: string,
      validation: {
        username: {
          title: string,
          items: [
            string,
            string,
          ]
        }
      },
      submit: string,
    },
    submit_result: {
      success_text: string
    }
  },
  err_result: {
    err_text_1: string
    err_text_2: string
    err_text_3: string
    err_text_4: string
    err_text_5: string
    err_text_6: string
    err_text_7: string
    err_text_8: string
    err_text_9: string
    err_text_10: string
    err_text_11: string
    err_text_12: string
    err_text_13: string
    err_text_14: string
    err_text_15: string
    err_text_16: string
    err_text_17: string
    err_text_18: string
    err_text_19: string
    err_text_20: string
  }
  signout: {
    text_1: string
    text_2: string
    text_3: string
    button: string
  }
  navBar: {
    casino: string,
    sport: string,
    my_vip_perks: string,
    more: string,
    live_support: string,
    earn_free_text: string
    task_text: string
    unlock_text: string
    spin_text: string
    menu_item_1: {
      promotions: string,
      vip_club: string,
      affiliate: string,
      blog: string,
    },
    casino_sub_menu: {
      recently_played: string,
      favorites: string,
      game_originals: string,
      slots: string,
      live_casino: string,
    },
    language: {
      title: string,
      english: string,
      portuguese: string,
      espanola: string,
    },
    sound_mode: {
      on: string,
      off: string,
    }
  }
  rightBar: {
    dropdownItem: {
      casino: string,
      sport: string
    }
    bottom: {
      yourMessage: string
    }
  }
  appBar: {
    logo_text_1: string
    logo_text_2: string
    id: string
    account: string
    deposit: string
    wager: string
    bonuses: string
    game_history: string
    transactions: string
    refer_friend: string
    earn_money: string
    withdraw: string
    install: string
    app: string
    fairness: string
    rewards: string
    preferences: string
    statistics: string
    sign_out: string
    vip: {
      bronze: string,
    }
  }
  home: {
    search: string
    button: {      
      all_game: string
      favorite: string
      recently_played: string
      original_game: string
      pg_soft: string
      slots: string
      live_casino: string
    }
    search_dialog : {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
      text_6: string
      search_history: string
    }
    original_games: string
    more: string
    more_text_1: string
    more_text_2: string
    more_text_3: string
    principal: string
    game_providers: string
    slots: string
    live_casino: string
    rank_text: string
    player_text: string
    profit_text: string
    game_text: string
    amount_text: string
    lucky_jackpot_text: string
    latest_record_text: string
    footer: {
      game: {
        title: string
        menu_1: string
        menu_2: string
        menu_3: string
        menu_4: string
      }
      helpful_links: {
        title: string
        menu_1: string
        menu_2: string
      }
      about_us: {
        title: string
        menu_1: string
        menu_2: string
        menu_3: string
        menu_4: string
        menu_5: string
      }
      footer_4: {
        text: string
      }
      logo: {
        text_1: string
        text_2: string
      }
      footer_6: {
        text: string
      }
    }
  }
  mobile_menu: {
    menu: string
    casino: string
    share: string
    sport: string
    mail: string
  }
  deposit_dialog: {
    deposit_info: {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
      text_6: string
    }
    deposit_currency: string
    choose_payment_method: string
    deposit_amount: string
    amount: string
    validation: {
      text_1: string
      text_2: string
      text_3: string
    }
    check_text: string
    other_text: string
    other_text_1: string
    deposit_btn_text: string
    personal_information: {
      header_text: string
      id_text: string
      first_name: string
      last_name: string
      confirm_text: string
      confirm_success_text: string
      confirm_warning_text: string
    }
  }
  transaction_history: {
    type: {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
      text_6: string
      text_7: string
      text_8: string
      text_9: string
      text_10: string
      text_11: string
      text_12: string
      text_13: string
      text_14: string
    }
  }
  withdraw_dialog: {
    withdraw_currency: string
    withdraw_payment_method: string
    withdraw_amount: string
    amount: string
    validation: {
      text_1: string
      text_2: string
      text_3: string
    }
    personal_information: {
      header_text: string
      id_text: string
      first_name: string
      last_name: string
      confirm_text: string
      confirm_success_text: string
      confirm_warning_text: string
    }
    text_1: string
    text_1_1: string
    text_2: string
    text_3: string
    text_4: string
    other_text: string
    other_text_1: string
    withdraw_btn_text: string
    withdraw_warning_text: string
  }
  mail_dialog: {
    header_text: string
  }
  affiliate: {
    tab: {
      text_1: string
      text_2: string
      text_3: string
    }
    invite: {
      invite_partner: string
      invited_user: string
      deposit_user: string
      bonus_today: string
      bonus_yesterday: string
      monthly_revenu_goal: string
      more_people_text: string
      premiums_text: string
      invitation_bonus: string
      betting_commision: string
      how_does_work: string
      how_does_content_1: string
      how_does_content_2: string
      achivement_bonus: string
      achivement_bonus_text_1: string
      agent_realization_text: string
      receive_btn_text: string
      commission_title_text: string
      commission_content_text: string
      invite_text_1: string
      invite_text_2: string
      invite_text_3_1: string
      invite_text_3_2: string
      invite_text_4_1: string
      invite_text_4_2: string
      invite_text_5_1: string
      invite_text_5_2: string
      invite_text_6: string
      invite_text_7: string
      invite_text_8: string
      invite_text_9: string
      invite_text_10: string
      invite_text_11: string
      invite_text_12: string
      help_text_1: string
      help_text_2: string
      bonus_dialog: {
        text_1: string
        text_2: string
        text_3: string
      }
    },
    statistics: {
      receive_btn_text: string
      total_profit_text: string
      mobile_profit_title: string
      text_1: string
      text_2: string
      text_3: string
      tab: {
        text_1: string
        text_2: string
        text_3: string
        today: {
          profit_today_text: string
        }
        week: {
          profit_this_week_text: string
        }
        month: {
          profit_this_month_text: string
        }
        profit_tab_text_1: string
        profit_tab_text_2: string
        profit_tab_text_3: string
        profit_tab_text_4: string
        profit_tab_text_5: string
      }
    }
    forms: {
      table: {
        time: string
        user: string
        bonus: string
      }
    }
  }
  bonus: {
    title_text: string
    total_text: string
    withdraw_text: string
    super_bonus_text: string
    bonus_text: string
    no_active_text: string
    table: {
      date: string
      deposit: string
      receive: string
      wager: string
    },
    dashboard_recharge_title1 : string,
    dashboard_recharge_title2 : string,
    dashboard_recharge_content1 : string,
    dashboard_recharge_content2 : string,
  }
  transaction: {
    tab: {
      game_history: string
      transactions: string
      deposit: string
      withdrawal: string
      vip: string
      referral: string
    }
    game_history: {
      game: string
      date: string
      amount: string
      multilier: string
      betId: string
      status: string
      profit: string
    }
    transactions: {
      date: string
      amount: string
      type: string
      id: string
      note: string
      balance: string
    }
    withdraw: {
      action: string
      refund: string
    }
  }
  account: {
    menu: {
      user_info_text: string
      personal_info_text: string
      document_text: string
      preference_text: string
      suspend_account_text: string
    }
    sub_menu: {
      user_info_text: string
      personal_info_text: string
      document_text: string
      preference_text: string
      suspend_account_text: string
    }
    item: {
      nick_name_text: string
      email_text: string
      area_text: string
      phone_text: string
      current_pwd_text: string
    }
    back_text: string
    edit_text: string
    save_text: string
    exist_validation_text: string
    phone_warning_text: string
    verify_code_text: string
    edit_password_text: string
    edit_nick_name_text: string
    edit_email_text: string
    edit_phone_text: string
    password: {
      current_text: string
      new_text: string
      repeat_text: string
    }
    repeat_validation_text: string
    suspend_account: {
      help_text: string
      duration_text: string
      minimum_duration_text: string
      confirm_text: string
      dialog: {
        title_text: string
        content_text_1: string
        content_text_2: string
        determine_btn_text: string
        cancel_btn_text: string
      }
    }
  }
  refferal: {
    app_bar_title: string
    earn_btn_text: string
    dialog: {
      header: {
        title_text: string
        body_text: string
        body_text_1: string
        body_text_2: string
        body_text_3: string
        body_text_4: string
      }
      body: {
        text_1: string
        text_2: string
        text_3: string
        copy_btn_text: string
      }
    }
    copy_success_text: string
    description: {
      text_1: string
      text_2: string
      term_text: string
      text_3: string
      back_btn_text: string
    }
  }
  vip: {
    slider: {
      title_text: string
    }
    all_bonus_text: string
    cash_back_text: string
    super_carousel_text: string
    welfare_task: string
    reward_text: string
    reward_card_1: {
      daily_free_bonus_text: string
      text_1: string
      text_2: string
    }
    reward_card_2: {
      vip_week_gift_text: string
      text_1: string
      text_2: string
      text_3: string
      text_4: string
    }
    reward_card_3: {
      vip_month_gift_text: string
      text_1: string
      text_2: string
      text_3: string
      text_4: string
    }
    reward_card_4: {
      vip_upgrage_gift_text: string
      text_1: string
      text_2: string
      text_3: string
    }
    receive_btn_text: string
    cashback_body: {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
      text_7: string
      text_8: string
      text_9: string
      text_10: string
      text_11: string
      text_12: string
      text_13: string
      text_14: string
    }
    super_spin_body: {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
    }
    vip_mission_body: {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
      text_6: string
      text_7: string
      text_8: string
      text_9: string
      text_10: string
      text_11: string
      text_12: string
      text_13: string
      text_15: string
    }
    benifit_description_body: {
      text_1: string
      text_2: string
      text_3: string
      text_4: string
      text_5: string
      text_6: string
      text_7: string
      text_8: string
      text_9: string
      text_10: string
      text_11: string
      text_12: string
      text_13: string
      text_14: string
      text_15: string
      text_16: string
      text_17: string
    }
    footer_body: {
      text_1: string
      text_2: string
      text_3: string
    }
    login_bonus: {
      title_text: string
      day_1_text: string
      day_2_text: string
      day_3_text: string
      day_4_text: string
      day_5_text: string
      day_6_text: string
      day_7_text: string
      day_8_text: string
      footer_text_1: string
      footer_text_2: string
      footer_text_3: string
      footer_text_4: string
    }
    roulette_bonus: {
      paid_text: string
      roulette_btn_text: string
      victory_btn_text: string
      winner_text: string
      prize_winner_text: string
      help_menu: {
        title_text: string
        text_1: string
        text_2: string
        text_3: string
        text_4: string
        text_5: string
        text_6: string
        text_7: string
        text_8: string
        text_9: string
        text_10: string
      }
    }
  }
  exception: {
    text_1: string
    text_2: string
    text_3: string
    text_4: string
    text_5: string
    text_6: string
    text_7: string
    text_8: string
    text_9: string
    text_10: string
    text_11: string
    text_12: string
    text_13: string
    text_14: string
    text_15: string
    text_16: string
    text_17: string
    text_18: string
    text_19: string
    text_20: string
    text_21: string
    text_22: string
    text_23: string
    text_24: string
    text_25: string
    text_26: string
    text_27: string
    text_28: string
    text_29: string
    text_30: string
    text_31: string
    text_32: string
    text_33: string
    text_34: string
    text_35: string
    text_36: string
    text_37: string
    text_38: string
    text_39: string
    text_40: string
    text_41: string
    text_42: string
  }
};