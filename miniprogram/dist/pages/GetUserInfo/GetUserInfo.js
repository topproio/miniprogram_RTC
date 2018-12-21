import dataStore from '../../utils/dataStore';
import commonModel from '../../models/common';

Page({
    data: {
        isload: true,
        form: ''
    },

    onLoad: function() {
        const form = dataStore.get('entryPage');
        form && this.setData({ form });

        const that = this;
        wx.getUserInfo({
            success: ({ userInfo }) => { // 如果用户已经授权
                dataStore.put('userInfo', userInfo);

                const avatar = userInfo.avatarUrl;
                const name = userInfo.nickName;

                this.loginRequest(avatar, name);
            },
            fail: that.hiddenLoad
        });
    },

    onGotUserInfo: function(evt) {
        const { userInfo } = evt.detail;

        if (!userInfo) return;
        dataStore.put('userInfo', userInfo);

        this.loginRequest(userInfo.avatarUrl, userInfo.nickName);
    },

    loginRequest: function(avatar, name) {
        const that = this;
        wx.login({
            success: ({code}) => {
                commonModel.login({avatar, name, code}).then((res) => {
                    const { token } = res.data;
                    dataStore.put('token', token);

                    const url = that.data.form || '/pages/index/index';
                    wx.reLaunch({ url });
                }).catch(that.hiddenLoad);
            },
            fail: that.hiddenLoad
        });
    },

    hiddenLoad: function() {
        this.setData({ isload: false });
    }
});
