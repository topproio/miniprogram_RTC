import rtcModel from '../../models/rtc';
import bus from '../../utils/bus';

let userId, sdkappid, roomId;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isChating: false,
        isMuted: false,
        pushUrl: 'room://cloud.tencent.com?',
        playUrl: '',
        cameraPosition: 'front'
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

            bus.emit('fetchFriend');
            return rtcModel.fetchRoomSig({ sdkappid, userId, userSig, roomId, PrivMapEncrypt });
        }).then(roomsig => {
            const pushUrl = `room://cloud.tencent.com?sdkappid=${sdkappid}&roomid=${roomId}&userid=${userId}&roomsig=${roomsig}`;

            this.setData({ pushUrl });
        }).catch(({message}) => {
            const icon = 'none';
            wx.showToast({ title: message, icon });
            this.stopChat();
        });
    },

    pushStateChange: function(e) {
        const { code, message } = e.detail;

        console.log(code);
        if (code !== 1020) return;

        const userList = JSON.parse(message).userlist;
        if (!userList.length) return;

        const playUrl = userList[0].playurl;

        this.setData({ playUrl });
    },

    stopChat: function() {
        const url = '/pages/index/index';
        wx.reLaunch({ url });
    },

    cameraToggle: function() {
        const cameraPosition = this.data.cameraPosition === 'front' ? 'back' : 'front';
        this.setData({ cameraPosition });
    },

    soundToggle: function() {
        const isMuted = !this.data.isMuted;
        this.setData({ isMuted });
    }
});