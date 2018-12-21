const dom = {

    // 输入框值与data绑定
    inputBuilding: function(evt) {
        const val = evt.detail.value;
        const data = evt.target.dataset.bind;
        this.setData({[data]: val});
    },

    /*  [节流]
    **  @params     handler     { function }  绑定事件
    **  @params     delay       { number   }  多次触发时,间隔多少时间执行,单位毫秒
    */
    throttle: function(handler, delay = 200) {
        let timer, last, args = Array.prototype.slice.call(arguments, 2);
        return function(evt) {
            let now = Date.now();
            clearTimeout(timer);

            args = args.concat(evt);
            if (last && now - last < delay) {
                timer = setTimeout(function() {
                    handler.apply(null, args);
                }, delay);
            } else {
                last = now;
                handler.apply(null, args);
            }
        };
    },

    /*  [显示提示语]
    **  @params     opts  { Object }  showToast原生穿参  icon默认为none
    **  @params     cb    { function }  隐藏toast回调
    */
    showToast: function(opts, cb) {
        const duration = opts.duration || 2000;
        const icon = opts.icon || 'none';

        wx.showToast(Object.assign(opts, { duration, icon }));
        const timer = setTimeout(function() {
            clearTimeout(timer);
            cb && cb();
        }, duration);
    }
};

export default dom;
