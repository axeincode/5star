// error handle function
export const handleException = (code: number) => {
    let errorMsg = '' as string;
    switch (code) {
        case 0:
            errorMsg = '失败';
            break;
        case 100000:
            errorMsg = 'The data passed is abnormal';
            break;
        case 100001:
            errorMsg = 'The password does not meet the requirements';
            break;
        case 100002:
            errorMsg = 'User account is locked';
            break;
        case 101001:
            errorMsg = 'Login data exception';
            break;
        case 101002:
            errorMsg = 'The login account or password is wrong';
            break;
        case 101003:
            errorMsg = 'Login account does not exist';
            break;
        case 102001:
            errorMsg = 'Failed to register data';
            break;
        case 102002:
            errorMsg = 'Registration data exception';
            break;
        case 102003:
            errorMsg = 'The account you entered has been used by someone else, please input again';
            break;
        case 103001:
            errorMsg = 'Abnormal nickname format (abnormal length or illegal identifier)';
            break;
        case 103002:
            errorMsg = 'Nickname is the same as email';
            break;
        case 103003:
            errorMsg = 'Email format exception (abnormal length or illegal identifier)';
            break;
        case 103004:
            errorMsg = 'Phone format exception (abnormal length or illegal identifier)';
            break;
        case 103005:
            errorMsg = 'The same password needs to be changed';
            break;
        case 103006:
            errorMsg = 'The current password is wrong';
            break;
        case 103007:
            errorMsg = 'The emails that need to be modified are the same';
            break;
        case 103008:
            errorMsg = 'The message that needs to be modified is already taken';
            break;
        case 103009:
            errorMsg = 'The avatar index that needs to be modified is wrong';
            break;
        case 103010:
            errorMsg = 'wrong birthday format';
            break;
        case 106001:
            errorMsg = '存款人信息未提交';
            break;
        case 106002:
            errorMsg = '存款人id重复';
            break;
        case 106003:
            errorMsg = '金額不符合區間值';
            break;
        case 106004:
            errorMsg = '存款失敗';
            break;
        case 106005:
            errorMsg = '存款人id格式異常';
            break;
        case 106101:
            errorMsg = '可提金額不符合';
            break;
        case 106202:
            errorMsg = '存款失敗';
            break;
        case 107001:
            errorMsg = 'vip数据异常';
            break;
        case 107002:
            errorMsg = 'vip任務异常';
            break;
        case 107003:
            errorMsg = 'vip任務領取失敗';
            break;
        case 107004:
            errorMsg = 'vip獲取獎勵失敗';
            break;
        case 107005:
            errorMsg = 'vip獎勵已領取';
            break;
        case 107006:
            errorMsg = 'vip任務獎勵領取 查詢不到任務';
            break;
        case 107007:
            errorMsg = 'vip任務獎勵領取 已領取';
            break;
        case 107008:
            errorMsg = 'vip任務獎勵領取 未達領取條件';
            break;
        case 107009:
            errorMsg = 'vip簽到不滿足條件';
            break;
        case 108001:
            errorMsg = '遊戲id有誤';
            break;
        case 108002:
            errorMsg = '遊戲分頁異常';
            break;
        case 108003:
            errorMsg = '遊戲最大分頁';
            break;
        case 108004:
            errorMsg = '遊戲類型異常';
            break;
    }
    return errorMsg;
}