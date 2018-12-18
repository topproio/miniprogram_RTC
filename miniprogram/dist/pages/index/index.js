import bus from '../../utils/bus';
import dataStore from '../../utils/dataStore';
import userModel from '../../models/user';
import callModel from '../../models/call';
import rtcModel from '../../models/rtc';

Page({
    data: {
        nickName: '',
        avatarUrl: '',
        friendCount: 0,
        duration: 0,
        friendList: []
    },

    onLoad: function() {
        bus.on('fetchFriend', this.fetchFriendList);

        const { avatarUrl, nickName } = dataStore.get('userInfo');
        this.setData({ avatarUrl, nickName });

        this.fetchFriendList();

        rtcModel.fetchSig().then(res => {
            console.log(res);
        });
    },

    fetchFriendList: function() {
        userModel.list().then(res => {
            const { friendList } = res.data;
            const friendCount = friendList.length;

            this.setData({ friendList, friendCount });
        });
    },

    callHandle: function(e) {
        const { formId } = e.detail;
        const { id } = e.target.dataset;

        callModel.create(id, formId).then(res => {
            console.log(res);
        });
    },

    onUnLoad: function() {
        bus.off('fetchFriend', this.fetchFriendList);
    }
});
