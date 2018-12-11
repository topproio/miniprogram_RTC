import dataStore from '../../utils/dataStore';
import commonModel from '../../models/common';

Page({
    data: {
        isload: true
    },

    onLoad: function() {
        wx.getUserInfo({
            success: ({ userInfo }) => { // 如果用户已经授权
                dataStore.put('userInfo', userInfo);

                const avatar = userInfo.avatarUrl;
                const name = userInfo.nickName;

                wx.login({
                    success: ({code}) => {
                        commonModel.login({avatar, name, code}).then(res => {
                            console.log(res);

                            wx.reLaunch({ url: '/pages/index/index'});
                        });
                    }
                });

            },
            complete: () => {
                this.setData({ isload: false });
            }
        });
    },

    onGotUserInfo: function(evt) {
        const res = evt.detail;

        if (!res.userInfo) return;
        dataStore.put('userInfo', res);
        wx.reLaunch({ url: '/pages/index/index'});
    }
});
