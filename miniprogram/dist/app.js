import dataStore from './utils/dataStore';

App({
    onLaunch: function(options) {
        const entryPage = '/' + options.path;
        const authPage = '/pages/GetUserInfo/GetUserInfo';

        if (entryPage === authPage) return;

        dataStore.put('entryPage', entryPage);
        wx.reLaunch({ url: '/pages/GetUserInfo/GetUserInfo'});
    }
});
