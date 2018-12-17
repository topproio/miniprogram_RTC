import dataStore from '../../utils/dataStore';


Page({
    data: {
        isChating: false,
        isMuted: false
    },

    onLoad: function() {

    },

    onShareAppMessage: function() {
        const { nickName } = dataStore.get('userInfo');
        return {
            title: `好友${nickName}邀请您进入通讯`,
            path: '/pages/ChatRoom/ChatRoom',
            imageUrl: '../../assets/images/banner-bg.png'
        };
    },


});
