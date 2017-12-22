if (!Object.prototype['extend']) {
    Object.defineProperty(Object.prototype, 'extend', {
        value: function (extObj) {
            if (!this) {
                throw new TypeError('Cannot read property "extend" of undefined ')
            }
            var _this = this;
            var o = new Object();

            Object.keys(extObj).forEach(function (item) {
                if(_this.hasOwnProperty(item)){
                    if(typeof _this[item] === "object") {
                        _this[item].extend(extObj[item]);
                    }
                } else{
                    _this[item] = extObj[item];
                } 
            });
            return o;
        }
    });
}