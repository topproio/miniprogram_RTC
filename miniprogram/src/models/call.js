import API from '../global/api';
import requset from '../global/request';

export default {
    create: function(id, formId) {
        return requset.post(API.call, { id, formId });
    }
};
