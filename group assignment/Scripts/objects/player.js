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
        function Player(assetManager) {
            var _this = _super.call(this, assetManager, "player") || this;
            _this.Start();
            return _this;
        }
        // Methods / functions
        Player.prototype.Start = function () {
            this.y = 50;
            this.colliding = false;
            this.x = 50;
            this.speed = 5;
            this.vSpeed = 1;
        };
        Player.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            if (this.vSpeed < 5) {
                this.vSpeed += 0.12;
            }
            this.y += this.vSpeed;
        };
        Player.prototype.Reset = function () { };
        Player.prototype.Move = function () {
            //this.x = objects.Game.stage.mouseX; // objects.Game.stage is a global variable
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= this.speed;
            }
            if (objects.Game.keyboardManager.moveRight) {
                this.x += this.speed;
            }
            if (objects.Game.keyboardManager.moveUp) {
                if (this.colliding == true) {
                    this.y -= 1;
                    if (this.vSpeed > 0) {
                        this.vSpeed *= -1;
                    }
                }
            }
            if (objects.Game.keyboardManager.moveDown) {
                this.y += this.speed;
            }
        };
        Player.prototype.CheckBounds = function () {
            // Check right boundary
            if (this.x >= 600 - this.halfW) {
                this.x = 600 - this.halfW;
            }
            // Check left boundary
            if (this.x <= this.halfW) {
                this.x = this.halfW;
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map