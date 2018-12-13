import API from '../global/api';
import requset from '../global/request';

export default {
    login: function(data) {
        return requset.post(API.login, data);
    }
};
