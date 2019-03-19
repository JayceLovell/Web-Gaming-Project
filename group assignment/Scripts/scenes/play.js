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
            this.tileSize = 32;
            this.objects = new Array();
            this.walls = new Array();
            this.checkPoints = new Array();
            this.hands = new Array();
            this.ghosts = new Array();
            this.level = 1;
            this.checkPointLevel = this.level;
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
                ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "wall", "", "", "", "", "", "", "", "hands", "hands", "hands", "", "", "", "checkpoint", "wall", "", "", "", "wall", "wall"],
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
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "green", "green", "checkpoint", "wall", "wall", "wall"],
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
                        case "player":
                            this.player = new objects.Player((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.objects.push(this.player);
                            break;
                        case "wall":
                            var wall = new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.walls.push(wall);
                            this.objects.push(wall);
                            break;
                        case "checkpoint":
                            var cp = new objects.checkPoint((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.checkPoints.push(cp);
                            this.objects.push(cp);
                            break;
                        case "hands":
                            var hand = new objects.hand((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.hands.push(hand);
                            this.objects.push(hand);
                            break;
                        case "ghost":
                            break;
                        default:
                            break;
                    }
                }
            }
            this.checkPointX = this.player.x;
            this.checkPointY = this.player.y;
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            this.player.Update();
            this.backButton.setX(this.backButton.getX() + 5);
            this.player.colliding = false;
            this.walls.forEach(function (wall) {
                if (managers.AABBCollisions.Check(_this.player, wall)) {
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
            this.checkPoints.forEach(function (checkPoint) {
                if (managers.AABBCollisions.Check(_this.player, checkPoint)) {
                    _this.checkPointX = checkPoint.x;
                    _this.checkPointY = checkPoint.y;
                    _this.checkPointLevel = _this.level;
                }
            });
            this.hands.forEach(function (hand) {
                if (managers.AABBCollisions.Check(_this.player, hand)) {
                    _this.player.x = _this.checkPointX;
                    _this.player.y = _this.checkPointY;
                    _this.moveScreen(_this.checkPointLevel);
                }
            });
            /*
            this.ghosts.forEach(ghost => {
                ghost.Update();
                if(managers.AABBCollisions.Check(this.player, ghost)){
                    this.player.x=this.checkPointX;
                    this.player.y=this.checkPointY;
                }
            });
            if(managers.AABBCollisions.Check(this.win, checkPoint)){
                    objects.Game.currentScene = config.Scene.OVER;
                }
            
        
        */ switch (this.level) {
                case 1:
                    if (this.player.y > this.tileSize * 17) {
                        this.moveScreen(2);
                    }
                    else if (this.player.x > this.tileSize * 20) {
                        this.moveScreen(3);
                    }
                    break;
                case 2:
                    if (this.player.y < 0) {
                        this.moveScreen(1);
                    }
                    else if (this.player.x > this.tileSize * 20) {
                        this.moveScreen(4);
                    }
                    break;
                case 3:
                    if (this.player.y > this.tileSize * 17) {
                        this.moveScreen(4);
                    }
                    else if (this.player.x < 0) {
                        this.moveScreen(1);
                    }
                    break;
                case 4:
                    if (this.player.y < 0) {
                        this.moveScreen(3);
                    }
                    else if (this.player.x < 0) {
                        this.moveScreen(2);
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
            this.objects.forEach(function (x) {
                _this.addChild(x);
            });
            this.addChild(this.playLabel);
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.quitButtonClick);
        };
        PlayScene.prototype.moveScreen = function (targetLevel) {
            var _this = this;
            switch (this.level) {
                case 1:
                    switch (targetLevel) {
                        case 2:
                            this.objects.forEach(function (o) {
                                o.y -= _this.tileSize * 17;
                            });
                            break;
                        case 3:
                            this.objects.forEach(function (o) {
                                o.x -= _this.tileSize * 20;
                            });
                            break;
                        case 4:
                            this.objects.forEach(function (o) {
                                o.x -= _this.tileSize * 20;
                                o.y -= _this.tileSize * 17;
                            });
                            break;
                    }
                    break;
                case 2:
                    switch (targetLevel) {
                        case 1:
                            this.objects.forEach(function (o) {
                                o.y += _this.tileSize * 17;
                            });
                            break;
                        case 3:
                            this.objects.forEach(function (o) {
                                o.x -= _this.tileSize * 20;
                                o.y += _this.tileSize * 17;
                            });
                            break;
                        case 4:
                            this.objects.forEach(function (o) {
                                o.x -= _this.tileSize * 20;
                            });
                            break;
                    }
                    break;
                case 3:
                    switch (targetLevel) {
                        case 1:
                            this.objects.forEach(function (o) {
                                o.x += _this.tileSize * 20;
                            });
                            break;
                        case 2:
                            this.objects.forEach(function (o) {
                                o.x += _this.tileSize * 20;
                                o.y -= _this.tileSize * 17;
                            });
                            break;
                        case 4:
                            this.objects.forEach(function (o) {
                                o.y -= _this.tileSize * 17;
                            });
                            break;
                    }
                    break;
                case 4:
                    switch (targetLevel) {
                        case 1:
                            this.objects.forEach(function (o) {
                                o.x += _this.tileSize * 20;
                                o.y += _this.tileSize * 17;
                            });
                            break;
                        case 2:
                            this.objects.forEach(function (o) {
                                o.x += _this.tileSize * 20;
                            });
                            break;
                        case 3:
                            this.objects.forEach(function (o) {
                                o.y += _this.tileSize * 17;
                            });
                            break;
                    }
                    break;
            }
            this.level = targetLevel;
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map