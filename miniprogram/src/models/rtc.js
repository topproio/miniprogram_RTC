import API from '../global/api';
import requset from '../global/request';

export default{
    fetchSig: function(friendId) {
        return requset.get(API.rtcSig, { friendId });
    },
    fetchRoomSig: function({sdkappid, userId, userSig, roomId, PrivMapEncrypt}) {
        const query = `?sdkappid=${sdkappid}&identifier=${userId}&usersig=${userSig}&random=9999&contenttype=json`;
        const url = API.rtcRoomSig + query;
        const body = {
            ReqHead: {
                Cmd:1,                               // 命令字，固定填1
                SeqNo:1,                             // 请求序列号，uint32
                BusType: 7,                          // 业务类型，固定填7
                GroupId: Number(roomId)              // 群组Id(房间Id)，uint32
            },
            ReqBody: {
                // PrivMap: '',                         // 非必填，明文权限位
                PrivMapEncrypt: PrivMapEncrypt,      // 必填，权限位加密串
                // IsIpRedirect: '',                    // 非必填，默认0；0非重定向；1是重定向
                TerminalType: 1,                     // 必填，终端类型，对应0x109中的TERMINAL_TYPE；Android：4；ios：2；
                FromType: 3,                         // 必填，请求来源类型：1：avsdk；2：webrtc；3：微信小程序；
                // SdkVersion: ''                       // 非必填，整型版本号
            }
        };

        return requset.post(url, body).then(res => {
            const roomsig =  encodeURIComponent(JSON.stringify(res.RspBody));
            return roomsig;
        });
    }
};
