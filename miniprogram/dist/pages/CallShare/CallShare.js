Page({
    onLoad: function() {
        wx.showShareMenu({ 
            withShareTicket: true,
            success: function() {
                wx.showToast({ title: '成功' });
            }
        });
    },

    onShareAppMessage: function() {
        return {
            title: '好友邀请您进入通讯',
            path: '/pages/CallShare/CallShare',
            imageUrl: '../../assets/images/banner-bg.png'
        };
    }
});
