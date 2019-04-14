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
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        // Variables
        // Constructor
        function Image(assetManager, imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = 
            // super(imageString);
            _super.call(this, assetManager.getResult(imageString)) || this;
            // Because image is now guarenteed to be loaded we can do the following...
            // Asset manager also returns a button object when getResult is called. 
            _this.regX = _this.getBounds().width * 0.5;
            _this.regY = _this.getBounds().height * 0.5;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // Methods
        Image.prototype.setX = function (newX) {
            this.x = newX;
        };
        Image.prototype.getX = function () {
            return this.x;
        };
        return Image;
    }(createjs.Bitmap));
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=image.js.map