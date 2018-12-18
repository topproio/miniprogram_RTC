import dataStore from '../../utils/dataStore';
import rtcModel from '../../models/rtc';

Page({
    data: {
        isChating: false,
        isMuted: false,
        pushUrl: '',
        sdkappid: '',
        roomid: '',
        userId: '',
        roomsig: ''
    },

    onLoad: function(option) {
        const { friendId } = option;

        rtcModel.fetchSig(friendId).then(res => {
            const { sdkappid, userId, userSig, roomId, PrivMapEncrypt } = res.data;

            this.setData({ userId });
            return rtcModel.fetchRoomSig({ sdkappid, userId, userSig, roomId, PrivMapEncrypt });
        }).then(res => {
            console.log(res);
        });
    },

    onShareAppMessage: function() {
        const { nickName } = dataStore.get('userInfo');
        const { userId } = this.data;
        return {
            title: `好友${nickName}邀请您进入通讯`,
            path: `/pages/ChatRoom/ChatRoom?friendId=${userId}`,
            imageUrl: '../../assets/images/banner-bg.png'
        };
    },

});
