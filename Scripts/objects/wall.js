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
    var Wall = /** @class */ (function (_super) {
        __extends(Wall, _super);
        // Variables
        // Constructor
        function Wall(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, "wall") || this;
            _this.regX = _this.getBounds().width * 0.5;
            _this.regY = _this.getBounds().height * 0.5;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // Methods
        Wall.prototype.setX = function (newX) {
            this.x = newX;
        };
        Wall.prototype.getX = function () {
            return this.x;
        };
        return Wall;
    }(objects.GameObject));
    objects.Wall = Wall;
})(objects || (objects = {}));
//# sourceMappingURL=wall.js.map