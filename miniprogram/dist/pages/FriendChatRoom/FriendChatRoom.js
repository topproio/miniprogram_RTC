import rtcModel from '../../models/rtc';


let userId, sdkappid, roomId;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pushUrl: '',
        playUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option) {
        const { originId, targetId } = option;

        rtcModel.fetchFriendSig({ originId, targetId }).then(res => {
            const { userSig, PrivMapEncrypt } = res.data;

            userId = res.data.userId;
            sdkappid = res.data.sdkappid;
            roomId = res.data.roomId;

            return rtcModel.fetchRoomSig({ sdkappid, userId, userSig, roomId, PrivMapEncrypt });
        }).then(roomsig => {
            const pushUrl = `room://cloud.tencent.com?sdkappid=${sdkappid}&roomid=${roomId}&userid=${userId}&roomsig=${roomsig}`;

            console.log(pushUrl);
            this.setData({ pushUrl });
        }).catch(({message}) => {
            const icon = 'none';
            wx.showToast({ title: message, icon });
            this.stopChat();
        });
    },

    stopChat: function() {
        const url = '/pages/index/index';
        wx.reLaunch({ url });
    },

    statechange: function(e) {
        const { code, message } = e.detail;
        if (code !== 1020) return;

        const userList = JSON.parse(message).userlist;
        if (!userList.length) return;

        const playUrl = userList[0].playurl;

        this.setData({ playUrl });
    }
});