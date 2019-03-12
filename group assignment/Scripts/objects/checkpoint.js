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
        function checkPoint(assetManager, imageString, x, y, xmin, xmax, ymin, ymax) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, assetManager, imageString) || this;
        }
        checkPoint.prototype.Update = function () { };
        return checkPoint;
    }(objects.GameObject));
    objects.checkPoint = checkPoint;
})(objects || (objects = {}));
//# sourceMappingURL=checkpoint.js.map