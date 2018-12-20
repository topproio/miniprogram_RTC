import dataStore from '../../utils/dataStore';
import rtcModel from '../../models/rtc';

Page({
    data: {
        isChating: false,
        isMuted: false,
        pushUrl: '',
        playUrl: '',
        sdkappid: '',
        roomId: '',
        userId: '',
        friendId: '',
        roomsig: ''
    },

    onLoad: function(option) {
        const { friendId } = option;

        this.setData({ friendId });
        rtcModel.fetchSig(friendId).then(res => {
            const { sdkappid, userId, userSig, roomId, PrivMapEncrypt } = res.data;

            this.setData({ userId, sdkappid, roomId });
            return rtcModel.fetchRoomSig({ sdkappid, userId, userSig, roomId, PrivMapEncrypt });
        }).then(roomsig => {
            const { userId, sdkappid, roomId } = this.data;
            const pushUrl = `room://cloud.tencent.com?sdkappid=${sdkappid}&roomid=${roomId}&userid=${userId}&roomsig=${roomsig}`;

            this.setData({ pushUrl });
        });
    },

    onShareAppMessage: function() {
        const { nickName } = dataStore.get('userInfo');
        const { userId, friendId } = this.data;
        return {
            title: `好友${nickName}邀请您进入通讯`,
            path: `pages/FriendChatRoom/FriendChatRoom?originId=${userId}&targetId=${friendId}`,
            imageUrl: '../../assets/images/banner-bg.png'
        };
    },

    statechange: function(e) {
        const { code, message } = e.detail;
        if (code !== 1020) return;

        const userList = JSON.parse(message).userlist;
        if (!userList.length) return;

        const playUrl = userList[0].playurl;

        this.setData({ playUrl, isChating: true });
    },

    stopChat: function() {
        const url = '/pages/index/index';
        wx.reLaunch({ url });
    },
});
