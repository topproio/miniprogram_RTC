App({
    onLaunch: function(options) {
        const emtryPage = '/' + options.path;
        const authPage = '/pages/GetUserInfo/GetUserInfo';

        if (emtryPage === authPage) return;
        wx.reLaunch({ url: authPage + '?form=' + emtryPage });
    }
});
