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
    var ghost = /** @class */ (function (_super) {
        __extends(ghost, _super);
        // Constructor
        function ghost(x, y, xmin, xmax, ymin, ymax) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, "player") || this;
            // Variables
            _this.forward = true;
            _this.xmin = xmin;
            _this.xmax = xmax;
            _this.ymin = ymin;
            _this.ymax = ymax;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        ghost.prototype.Start = function () { };
        ghost.prototype.Update = function () {
            if (this.forward) {
                this.speedX = Math.abs(this.xmax - this.x);
                this.speedY = Math.abs(this.ymax - this.y);
                if (Math.abs(this.xmax - this.x) < 1 && Math.abs(this.ymax - this.y) < 1)
                    this.forward = false;
            }
            else {
                this.speedX = Math.abs(this.xmin - this.x);
                this.speedY = Math.abs(this.ymin - this.y);
                if (Math.abs(this.xmin - this.x) < 1 && Math.abs(this.ymin - this.y) < 1)
                    this.forward = true;
            }
        };
        ghost.prototype.Reset = function () { };
        ghost.prototype.Move = function () { };
        ghost.prototype.CheckBounds = function () { };
        return ghost;
    }(objects.GameObject));
    objects.ghost = ghost;
})(objects || (objects = {}));
//# sourceMappingURL=ghost.js.map