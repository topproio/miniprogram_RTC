import dataStore from '../../utils/dataStore';
import rtcModel from '../../models/rtc';

let friendId; // 好友id

Page({
    data: {
        isChating: false,
        isMuted: false
    },

    onLoad: function(option) {
        friendId = option.friendId;

        rtcModel.fetchSig(friendId).then(res => {
            console.log(res);
        });
    },

    onShareAppMessage: function() {
        const { nickName } = dataStore.get('userInfo');
        return {
            title: `好友${nickName}邀请您进入通讯`,
            path: `/pages/ChatRoom/ChatRoom?userId=${friendId}`,
            imageUrl: '../../assets/images/banner-bg.png'
        };
    },

});
