import dataStore from '../../utils/dataStore';
import rtcModel from '../../models/rtc';

let sdkappid, roomId, userId, friendId, waitTimer;
Page({
    data: {
        friendAvatar: '',
        isChating: false,
        isMuted: false,
        pushUrl: '',
        playUrl: '',
        cameraPosition: 'front'
    },

    onLoad: function(option) {
        friendId = option.id;
        const friendAvatar = option.avatar || '';
        this.setData({ friendAvatar });

        this.setPushUrl(friendId);
    },

    onReady: function() {
        this.waitCountDown();
    },

    onShareAppMessage: function() {
        const { nickName } = dataStore.get('userInfo');

        return {
            title: `${nickName}邀请您进入通讯`,
            path: `pages/FriendChatRoom/FriendChatRoom?originId=${userId}&targetId=${friendId}`,
            imageUrl: '../../assets/images/banner-bg.png'
        };
    },

    onUnload: function() {
        clearTimeout(waitTimer);
    },

    setPushUrl: function(friendId) {
        rtcModel.fetchSig(friendId).then(({data}) => {
            const { userSig, PrivMapEncrypt } = data;

            sdkappid = data.sdkappid;
            userId = data.userId;
            roomId = data.roomId;

            return rtcModel.fetchRoomSig({ sdkappid, userId, userSig, roomId, PrivMapEncrypt });
        }).then(roomsig => {
            const pushUrl = `room://cloud.tencent.com?sdkappid=${sdkappid}&roomid=${roomId}&userid=${userId}&roomsig=${roomsig}`;

            this.setData({ pushUrl });
        });
    },

    pushStateChange: function(e) {
        const { code, message } = e.detail;
        if (code !== 1020) return;

        const userList = JSON.parse(message).userlist;
        if (!userList.length) return;

        const playUrl = userList[0].playurl;

        this.setData({ playUrl, isChating: true });
    },

    waitCountDown: function() {
        waitTimer = setTimeout(() => {
            clearTimeout(waitTimer);
            if (this.data.isChating) return;

            this.stopChat();
            wx.showToast({ title: '退出通话 等待超时', icon: 'none' });
        }, 20 * 1000);
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
