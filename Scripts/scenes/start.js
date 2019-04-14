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
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Constructors
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Methods
        StartScene.prototype.startButtonClick = function () {
            objects.Game.currentScene = config.Scene.GAME;
        };
        // Use start function to create objects
        StartScene.prototype.Start = function () {
            this.welcomeLabel = new objects.Label("Miner Horror Never Ending Cause \n He  Failed To Win A Race In \n Part Two and Died In Part 1 \n So Now He Is in part three \n fighting for his life in hell \n against an annoying precision \n platformer", "32px", "Consolas", "#FFFFFF", 1920, 140, true);
            this.buttonLabel = new objects.Label("Start Game", "30px", "Consolas", "#FFFFFF", 480, 395, true);
            this.startButton = new objects.Button(this.assetManager, "startButton", 480, 400);
            this.bgImage = new objects.Image(this.assetManager, "backGroundImageMain", 480, 400);
            this.Main();
        };
        StartScene.prototype.Update = function () {
        };
        StartScene.prototype.Main = function () {
            this.addChild(this.bgImage);
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            this.addChild(this.buttonLabel);
            this.startButton.on("click", this.startButtonClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map