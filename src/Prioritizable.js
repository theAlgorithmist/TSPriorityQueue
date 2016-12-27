System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Prioritizable;
    return {
        setters:[],
        execute: function() {
            Prioritizable = (function () {
                function Prioritizable(TConstructor) {
                    this._priority = 0;
                    this._timestamp = 0;
                    // pre-construct the data type?
                    if (TConstructor)
                        this._data = new TConstructor();
                }
                Object.defineProperty(Prioritizable.prototype, "priority", {
                    get: function () {
                        return this._priority;
                    },
                    set: function (value) {
                        if (!isNaN(value) && value === value && value >= 0)
                            this._priority = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Prioritizable.prototype, "timestamp", {
                    get: function () {
                        return this._timestamp;
                    },
                    set: function (value) {
                        if (!isNaN(value) && value === value && value >= 0)
                            this._timestamp = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Prioritizable.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    set: function (value) {
                        if (value)
                            this._data = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Prioritizable;
            }());
            exports_1("Prioritizable", Prioritizable);
        }
    }
});
//# sourceMappingURL=Prioritizable.js.map