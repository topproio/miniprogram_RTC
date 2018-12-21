import userModel from '../../models/user';
import bus from '../../utils/bus';

Page({
    data: {
        name: '',
        userList: []
    },

    onShareAppMessage: function() {
        return {
            title: 'RTC即时通讯,来自toppro团队邀请函',
            path: 'pages/GetUserInfo/GetUserInfo',
            imageUrl: '../../assets/images/user_avatar.png'
        };
    },

    inputBuilding: function(e) {
        const name = e.detail.value;

        this.setData({ name });
        userModel.search(name).then(res => {
            const userList = res.data.userList.data;
            this.setData({ userList });
        });
    },

    addFriendHandle: function(e) {
        const { id } = e.currentTarget.dataset;

        userModel.create(id).then(() => {
            bus.emit('fetchFriend');

            wx.showToast({ title: '添加成功囖' });
        }).catch(({message}) => {
            const title = message;
            wx.showToast({ title, icon: 'none' });
        });
    }
});
