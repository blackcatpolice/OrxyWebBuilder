if (!Object.prototype['clone']) {
    Object.defineProperty(Object.prototype, 'clone', {
        value: function () {
            if (!this) {
                throw new TypeError('Cannot read property "clone" of undefined ')
            }
            var _this = this;
            var o = new Object();

            Object.keys(_this).forEach(function (item) { 
                if (typeof _this[item] === "object")
                    o[item] = _this[item];
                else
                    o[item] = _this[item];
            });
            return o;
        }
    });
}