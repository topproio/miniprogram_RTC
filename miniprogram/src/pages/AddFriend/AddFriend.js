import userModel from '../../models/user';

Page({
    data: {
        name: '',
        userList: []
    },

    onLoad: function() {

    },

    inputBuilding: function(e) {
        const name = e.detail.value;
        userModel.search(name).then(res => {
            const { user } = res.data;
            this.setData({ userList: user });
        });
    },

    addFriendHandle: function(e) {
        const { id } = e.currentTarget.dataset;

        userModel.create(id).then(() => {
            wx.showToast({ title: '添加成功囖' });
        }).catch(err => {
            const { message } = err;
            wx.showToast({ title: message, icon: 'none' });
        });
    }
});
