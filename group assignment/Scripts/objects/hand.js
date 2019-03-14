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
    var hand = /** @class */ (function (_super) {
        __extends(hand, _super);
        function hand(x, y, xmin, xmax, ymin, ymax) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, "player") || this;
        }
        hand.prototype.Start = function () { };
        hand.prototype.Update = function () { };
        hand.prototype.Reset = function () { };
        hand.prototype.Move = function () { };
        hand.prototype.CheckBounds = function () { };
        return hand;
    }(objects.GameObject));
    objects.hand = hand;
})(objects || (objects = {}));
//# sourceMappingURL=hand.js.map