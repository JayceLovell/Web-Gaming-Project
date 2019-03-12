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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Methods
        PlayScene.prototype.Start = function () {
            this.playLabel = new objects.Label("Game Playing", "40px", "Consolas", "#FFFFFF", 320, 100, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 340);
            this.backButton = new objects.Button(this.assetManager, "backButton", 140, 340);
            this.backGroundImage = new objects.Image(this.assetManager, "backGroundImagePlay", 320, 400);
            this.floor = new objects.Wall(this.assetManager, "wall", 250, 400);
            this.player = new objects.Player(this.assetManager);
            this.checkPointIndex = 0;
            // add in the player, walls. ghost, hands, checkpoint and win gameobjects into the scene
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.player.Update();
            this.backButton.setX(this.backButton.getX() + 5);
            //this.backButton.setX(this.backButton.getX() + 5);
            /*
            this.player.Update();

            this.walls.forEach(wall => {
                if(managers.Collision.Check(this.player, wall)){
                    this.player.x=this.player.previousX;
                    this.player.y=this.player.previousY;
                }
            });
            this.ghost.forEach(ghost => {
                ghost.Update();
                if(managers.Collision.Check(this.player, ghost)){
                    this.player.x=checkPoint[checkPointIndex].x;
                    this.player.y=checkPoint[checkPointIndex].y;
                }
            });
            this.hands.forEach(hand => {
                if(managers.Collision.Check(this.player, hand)){
                    this.player.x=checkPoint[checkPointIndex].x;
                    this.player.y=checkPoint[checkPointIndex].y;
                }
            });
            this.checkPoint.forEach(checkPoint => {
                if(managers.Collision.Check(this.player, checkPoint)){
                    checkPointIndex=checkPoint.index;
                }
            });

            if(managers.Collision.Check(this.win, checkPoint)){
                    objects.Game.currentScene = config.Scene.OVER;
                }
            
        }
        */
            this.player.colliding = managers.AABBCollisions.Check(this.player, this.floor);
            if (this.player.colliding) {
                if (this.player.y >= this.floor.y) {
                    this.player.y = this.floor.y + (this.floor.regY + (this.floor.height / 2));
                }
                else {
                    this.player.y = this.floor.y - (this.floor.regY + (this.floor.height / 2));
                }
                //this.backgroundMusic.stop();
                //objects.Game.currentScene = config.Scene.OVER;
            }
        };
        // Button Even Handlers
        PlayScene.prototype.nextButtonClick = function () {
            objects.Game.currentScene = config.Scene.OVER;
        };
        PlayScene.prototype.quitButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        PlayScene.prototype.Main = function () {
            //this.addChild(this.backGroundImage);
            this.addChild(this.playLabel);
            //this.addChild(this.nextButton);
            //this.addChild(this.backButton);
            this.addChild(this.floor);
            this.addChild(this.player);
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.quitButtonClick);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map