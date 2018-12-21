import bus from '../../utils/bus';
import dataStore from '../../utils/dataStore';
import userModel from '../../models/user';

Page({
    data: {
        nickName: '',
        avatarUrl: '',
        friendCount: 0,
        friendList: []
    },

    onLoad: function() {
        bus.on('fetchFriend', this.fetchFriendList);

        const { avatarUrl, nickName } = dataStore.get('userInfo');
        this.setData({ avatarUrl, nickName });

        this.fetchFriendList();
    },

    fetchFriendList: function() {
        userModel.list().then(res => {
            const { friendList } = res.data;
            const friendCount = friendList.length;

            this.setData({ friendList, friendCount });
        });
    },

    onUnLoad: function() {
        bus.off('fetchFriend', this.fetchFriendList);
    }
});
