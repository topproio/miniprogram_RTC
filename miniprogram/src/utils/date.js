/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * pattern(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * pattern(new Date(), 'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * pattern(new Date(), 'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * pattern(new Date(), 'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * pattern(new Date(), 'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 */

const date = {
    pattern: function(_date, fmt) {
        const d = _date instanceof Date ? _date : new Date(_date);

        const o = {
            'M+': d.getMonth() + 1, // 月份
            'd+': d.getDate(), // 日
            'h+': d.getHours() % 12 === 0 ? 12 : d.getHours() % 12, // 小时
            'H+': d.getHours(), // 小时
            'm+': d.getMinutes(), // 分
            's+': d.getSeconds(), // 秒
            'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
            'S': d.getMilliseconds() // 毫秒
        };

        const week = {
            '0': '日',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六'
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            let e;
            switch (true) {
            case RegExp.$1.length === 2:
                e = '周';
                break;
            case RegExp.$1.length === 3:
                e = '星期';
                break;
            default:
                e = '';
                break;
            }

            fmt = fmt.replace(RegExp.$1, e + week[d.getDay() + '']);
        }
        for (const k of Object.keys(o)) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
};

export default date;
