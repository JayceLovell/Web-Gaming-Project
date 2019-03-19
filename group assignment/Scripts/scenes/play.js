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
            this.checkPointIndex = 0;
            this.tileSize = 32;
            this.walls = new Array();
            this.level = 1;
            // add in the player, walls. ghost, hands, checkpoint and win gameobjects into the scene
            //this.floor = new objects.Wall(250,400);
            this.GenerateLevel();
            this.Main();
        };
        PlayScene.prototype.GenerateLevel = function () {
            this.initMap = [["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "end", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "hands", "", "", "", "", "", "hands", "", "", "", "", "", "", "", "hands", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "hands", "", "", "hands", "", "", "", "", "", "hands", "hands", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "player", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "light green", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "", "", "", "", "", "", "", "", "light green", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "", "", "", "", "wall", "wall", "", "", "hands", "", "", "", "", "", "", "", "", "", "", "", "green", "", "", "", "light green", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "wall", "", "", "", "", "", "", "", "hands", "hands", "hands", "", "", "", "check point", "wall", "", "", "", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "", "wall", "wall", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "deep blue", "deep blue", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "hands", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "ghost", "", "", "", "", "", "", "", "wall", "", "", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "", "", "", "green", "", "", "", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "wall", "", "", "wall", "", "", "", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "wall", "hands", "hands", "wall", "", "", "wall", "", "hands", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "", "", "wall", "wall", "hands", "hands", "wall", "wall", "wall", "wall", "", "", "wall", "", "", "", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "wall", "", "", "", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "", "", "", "wall", "", "", "hands", "", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "hands", "hands", "hands", "", "", "checkpoint", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "gray", "wall", "wall", "wall"],
                ["wall", "wall", "", "", "", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "hands", "hands", "hands", "", "", "wall", "", "", "", "", "", "", "", "hands", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "hands", "hands", "hands", "wall", "wall", "wall", "wall", "wall", "", "", "", "light green", "wall", "wall", "wall", "", "", "", "wall", "hands", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "purple", "purple", "purple", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "", "", "", "wall", "wall", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "hands", "hands", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "green", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "green", "green", "green", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "green", "green", "check point", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "hands", "", "", "", "green", "", "", "", "wall", "wall", "", "", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "purple", "", "", "", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "", "", "", "", "", "", "hands", "hands", "", "", "", "", "hands", "hands", "", "", "", "purple", "", "", "checkpoint", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "hands", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "hands", "hands", "", "", "hands", "hands", "hands", "hands", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", ""],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", ""],
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", ""]];
            for (var i = 0; i < 34; i++) {
                for (var j = 0; j < 40; j++) {
                    switch (this.initMap[i][j]) {
                        case "wall":
                            this.walls.push(new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize));
                            break;
                        case "player":
                            this.player = new objects.Player((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            this.player.Update();
            this.backButton.setX(this.backButton.getX() + 5);
            this.player.colliding = false;
            this.walls.forEach(function (wall) {
                if (managers.AABBCollisions.Check(_this.player, wall)) {
                    console.log(_this.player.colliding);
                    if (managers.AABBCollisions.checKSides(_this.player, wall) == 1) {
                        _this.player.y = wall.y - wall.halfH - _this.player.halfH + 0.1;
                        _this.player.colliding = true;
                    }
                    else if (managers.AABBCollisions.checKSides(_this.player, wall) == 2) {
                        _this.player.y = wall.y + wall.halfH + _this.player.halfH - 0.1;
                    }
                    else if (managers.AABBCollisions.checKSides(_this.player, wall) == 3) {
                        _this.player.x = wall.x + wall.halfW + _this.player.halfW + 0.1;
                    }
                    else if (managers.AABBCollisions.checKSides(_this.player, wall) == 4) {
                        _this.player.x = wall.x - wall.halfW - _this.player.halfW - 0.1;
                    }
                }
            });
            /*
            this.ghost.forEach(ghost => {
                ghost.Update();
                if(managers.AABBCollisions.Check(this.player, ghost)){
                    this.player.x=checkPoint[checkPointIndex].x;
                    this.player.y=checkPoint[checkPointIndex].y;
                }
            });
            this.hands.forEach(hand => {
                if(managers.AABBCollisions.Check(this.player, hand)){
                    this.player.x=checkPoint[checkPointIndex].x;
                    this.player.y=checkPoint[checkPointIndex].y;
                }
            });
            this.checkPoint.forEach(checkPoint => {
                if(managers.AABBCollisions.Check(this.player, checkPoint)){
                    checkPointIndex=checkPoint.index;
                }
            });

            if(managers.AABBCollisions.Check(this.win, checkPoint)){
                    objects.Game.currentScene = config.Scene.OVER;
                }
            
        }
        */ switch (this.level) {
                case 1:
                    if (this.player.y > this.tileSize * 17) {
                        this.player.y -= this.tileSize * 17;
                        this.walls.forEach(function (w) {
                            w.y -= _this.tileSize * 17;
                        });
                        this.level = 2;
                    }
                    else if (this.player.x > this.tileSize * 20) {
                        this.player.x -= this.tileSize * 20;
                        this.walls.forEach(function (w) {
                            w.x -= _this.tileSize * 20;
                        });
                        this.level = 3;
                    }
                    break;
                case 2:
                    if (this.player.y < 0) {
                        this.player.y += this.tileSize * 17;
                        this.walls.forEach(function (w) {
                            w.y += _this.tileSize * 17;
                        });
                        this.level = 1;
                    }
                    else if (this.player.x > this.tileSize * 20) {
                        this.player.x -= this.tileSize * 20;
                        this.walls.forEach(function (w) {
                            w.x -= _this.tileSize * 20;
                        });
                        this.level = 4;
                    }
                    break;
                case 3:
                    if (this.player.y > this.tileSize * 17) {
                        this.player.y -= this.tileSize * 17;
                        this.walls.forEach(function (w) {
                            w.y -= _this.tileSize * 17;
                        });
                        this.level = 4;
                    }
                    else if (this.player.x < 0) {
                        this.player.x += this.tileSize * 20;
                        this.walls.forEach(function (w) {
                            w.x += _this.tileSize * 20;
                        });
                        this.level = 1;
                    }
                    break;
                case 4:
                    if (this.player.y < 0) {
                        this.player.y += this.tileSize * 17;
                        this.walls.forEach(function (w) {
                            w.y += _this.tileSize * 17;
                        });
                        this.level = 3;
                    }
                    else if (this.player.x < 0) {
                        this.player.x += this.tileSize * 20;
                        this.walls.forEach(function (w) {
                            w.x += _this.tileSize * 20;
                        });
                        this.level = 2;
                    }
                    break;
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
            var _this = this;
            //this.addChild(this.backGroundImage);
            this.addChild(this.player);
            this.walls.forEach(function (x) {
                _this.addChild(x);
            });
            this.addChild(this.playLabel);
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.quitButtonClick);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map