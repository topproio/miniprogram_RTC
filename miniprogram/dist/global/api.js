const ApiOrigin = 'http://leo.primercss.cn';
'http://api.rtc.test'
const RTCApi = 'https://official.opensso.tencent-cloud.com';

const WEB_CONFIG = {
    login: ApiOrigin + '/api/webapp/login',

    userSearch: ApiOrigin + '/api/users/search',
    userCreate: ApiOrigin + '/api/users/create',
    userList: ApiOrigin + '/api/users',

    rtcSig: ApiOrigin + '/api/rtc/sig',
    rtcFriendSig: ApiOrigin + '/api/rtc/friendsig',
    rtcRoomSig: RTCApi + '/v4/openim/jsonvideoapp'
};

export default WEB_CONFIG;
