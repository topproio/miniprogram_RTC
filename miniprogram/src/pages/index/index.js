import dataStore from '../../utils/dataStore';
import userModel from '../../models/user';
import callModel from '../../models/call';

Page({
    data: {
        nickName: '',
        avatarUrl: '',
        friend: 0,
        duration: 0,
        friendList: []
    },

    onLoad: function() {
        const { avatarUrl, nickName } = dataStore.get('userInfo');
        this.setData({ avatarUrl, nickName });

        this.fetchFriendList();
    },

    fetchFriendList: function() {
        userModel.list().then(res => {
            const { friendList } = res.data;
            this.setData({ friendList });
        });
    },

    callHandle: function(e) {
        const { formId } = e.detail;
        const { id } = e.target.dataset;

        callModel.create(id, formId).then(res => {
            console.log(res);
        });
    }
});
