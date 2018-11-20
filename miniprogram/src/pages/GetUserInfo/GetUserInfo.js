import dataStore from '../../utils/dataStore';

Page({
    data: {
        isload: true
    },

    onLoad: function() {
        wx.getUserInfo({
            success: (res) => { // 如果用户已经授权
                dataStore.put('userInfo', res);
                wx.reLaunch({ url: '/pages/index/index'});
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
