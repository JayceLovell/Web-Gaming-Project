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
    var Ghost = /** @class */ (function (_super) {
        __extends(Ghost, _super);
        // Constructor
        function Ghost(x, y, tileSize) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (tileSize === void 0) { tileSize = 48; }
            var _this = _super.call(this, "ghost") || this;
            // Variables
            _this.forward = true;
            _this.isPlayerClose = false;
            _this.xmin = x - (2 * tileSize);
            _this.xmax = x + (2 * tileSize);
            _this.x = x;
            _this.y = y;
            _this.speed = 2;
            return _this;
        }
        Ghost.prototype.Start = function () { };
        Ghost.prototype.Update = function () {
            if (this.x <= this.xmin) {
                this.speed = 2;
            }
            else if (this.x >= this.xmax) {
                this.speed = -2;
            }
            this.x += this.speed;
        };
        Ghost.prototype.Reset = function () { };
        Ghost.prototype.Move = function () { };
        Ghost.prototype.CheckBounds = function () { };
        return Ghost;
    }(objects.GameObject));
    objects.Ghost = Ghost;
})(objects || (objects = {}));
//# sourceMappingURL=ghost.js.map