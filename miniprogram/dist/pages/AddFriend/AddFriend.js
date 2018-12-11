import dataStore from '../../utils/dataStore';

Page({
    data: {
        userInfo: null,
        friend: 0,
        duration: 0
    },
    onLoad: function() {
        const userInfo = dataStore.get('userInfo').userInfo;
        this.setData({ userInfo });
    }
});
