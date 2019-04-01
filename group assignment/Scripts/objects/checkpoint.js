var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var checkPoint = /** @class */ (function (_super) {
        __extends(checkPoint, _super);
        function checkPoint(x, y, tileSize) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (tileSize === void 0) { tileSize = 48; }
            var _this = _super.call(this, "savePoint") || this;
            _this.x = x;
            _this.y = y;
            if (_this.x <= 20 * tileSize && _this.y < 17 * tileSize)
                _this.index = 1;
            else if (_this.x <= 20 * tileSize)
                _this.index = 2;
            else if (_this.x > 20 * tileSize)
                _this.index = 3;
            else
                _this.index = 4;
            return _this;
        }
        checkPoint.prototype.Update = function () { };
        return checkPoint;
    }(objects.GameObject));
    objects.checkPoint = checkPoint;
})(objects || (objects = {}));
//# sourceMappingURL=checkpoint.js.map