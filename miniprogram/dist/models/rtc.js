import API from '../global/api';
import requset from '../global/request';

export default{
    fetchSig: function() {
        return requset.get(API.rtcSig);
    }
};
