import API from '../global/api';
import request from '../global/request';

export default {
    search: function(name) {
        return request.get(API.userSearch, { name });
    },
    create: function(id) {
        return request.post(API.userCreate, { id });
    },
    list: function() {
        return request.get(API.userList);
    }
};
