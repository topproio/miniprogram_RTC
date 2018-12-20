import dataStore from '../utils/dataStore';

const Methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];

class SafeRequest {
    static getInstance() {
        if (!SafeRequest.instance) {
            SafeRequest.instance = new SafeRequest();
        }
        return SafeRequest.instance;
    }

    constructor() {
        Methods.forEach(method => {
            const key = method.toLowerCase();
            this[key] = this._requestInit(method);
        });
    }

    _requestInit(method) {
        return function(url, data) {
            return new Promise((reslove, reject) => {
                const header = {
                    'Authorization': 'Bearer ' + dataStore.get('token')
                };

                wx.request({
                    url,
                    header,
                    data,
                    method,
                    dataType: 'json',
                    success: res => {
                        switch(true) {
                        case res.statusCode === 200 && res.data.code === 200:
                            reslove(res.data);
                            break;
                        case res.statusCode === 200 && res.data.code !== (200 && undefined):
                            reject(res.data);
                            break;
                        default:
                            reslove(res.data);
                        }
                    },
                    fail: reject
                });
            });
        };
    }
}

export default SafeRequest.getInstance();
