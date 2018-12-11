const dom = {

    // 输入框值与data绑定
    inputBuilding: function(evt) {
        const val = evt.detail.value;
        const data = evt.target.dataset.bind;
        this.setData({[data]: val});
    }
};

export default dom;
