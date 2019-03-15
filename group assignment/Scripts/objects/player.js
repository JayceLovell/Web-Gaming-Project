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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // Constructor
        function Player(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, "player") || this;
            _this.Start();
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // Methods / functions
        Player.prototype.Start = function () {
            this.colliding = false;
            this.speed = 5;
            this.vSpeed = 1;
            this.previousX = this.x;
            this.previousY = this.y;
        };
        Player.prototype.Update = function () {
            this.previousX = this.x;
            this.previousY = this.y;
            this.Move();
            this.CheckBounds();
            if (this.vSpeed < 15) {
                this.vSpeed += 0.7;
            }
            this.y += this.vSpeed;
        };
        Player.prototype.Reset = function () { };
        Player.prototype.Move = function () {
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= this.speed;
            }
            if (objects.Game.keyboardManager.moveRight) {
                this.x += this.speed;
            }
            if (objects.Game.keyboardManager.moveUp) {
                //if(this.colliding == true){
                this.y -= 1;
                if (this.vSpeed > 0) {
                    this.vSpeed = -15;
                }
                //}
            }
            if (objects.Game.keyboardManager.moveDown) {
            }
        };
        Player.prototype.CheckBounds = function () {
            /*
            // Check right boundary
            if(this.x >= 600 - this.halfW) {
                this.x = 600 - this.halfW;
            }

            // Check left boundary
            if(this.x <= this.halfW) {
                this.x = this.halfW;
            }
            */
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map