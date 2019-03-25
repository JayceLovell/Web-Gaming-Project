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
            this.traps = new Array();
            this.level = 1;
            this.checkPointLevel = this.level;
            this.trapsActivation = new Array();
            for (var i = 0; i < 1000; i++) { //trap length
                this.trapsActivation.push(false);
            }
            this.GenerateLevel();
            this.GenerateTraps();
            this.Main();
        };
        PlayScene.prototype.GenerateTraps = function () {
            //hidden spikes in walls
            this.addWall(7, 15); //0
            this.addWall(15, 20);
            this.addWall(22, 25);
            this.addWall(22, 26);
            this.addWall(23, 25);
            this.addWall(23, 26); //5
            this.addWall(28, 19);
            this.addWall(28, 18);
            this.addWall(28, 17);
            this.addWall(29, 19);
            this.addWall(29, 18); //10
            this.addWall(29, 17);
            this.addWall(30, 31);
            this.addWall(31, 19);
            this.addWall(34, 16);
            this.addWall(13, 9); //15
            this.addWall(14, 9);
            this.addWall(15, 9);
            this.addWall(23, 6);
            //invisible walls
            this.addInvisWall(10, 12);
            this.addInvisWall(20, 29); //20
            this.addInvisWall(20, 30);
            this.addInvisWall(20, 31);
            this.addInvisWall(33, 9);
            //fake walls
            this.addWall(13, 19);
            this.addWall(22, 11); //25
            this.addWall(22, 23);
            this.addWall(22, 24);
            this.addWall(22, 27);
            this.addWall(23, 23);
            this.addWall(23, 24); //30
            this.addWall(23, 27);
            this.addWall(34, 26);
            this.addWall(34, 27);
            this.addWall(35, 26);
            this.addWall(35, 27); //35
            this.addWall(36, 26);
            this.addWall(36, 27);
            this.addWall(37, 7);
            this.addWall(37, 8);
            this.addWall(37, 9); //40
            this.addInvisTrap(20, 23);
            this.addInvisTrap(21, 23);
            this.addInvisTrap(22, 23);
            this.addInvisTrap(22, 29);
            this.addInvisTrap(22, 30); //45
            this.addTrap(8, 10);
            //trap 0
        };
        PlayScene.prototype.updateTraps = function () {
            //hidden traps in walls
            for (var i = 0; i < 18; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y = -10000;
                    this.trapsActivation[i] = true;
                }
            }
            //invis wall
            for (var i = 18; i < 23; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y - 10000) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y += 10000;
                    this.trapsActivation[i] = true;
                }
            }
            //fake walls
            for (var i = 23; i < 40; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y = -10000;
                    this.trapsActivation[i] = true;
                }
            }
            //invis spikes
            for (var i = 40; i < 45; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y - 10000) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y += 10000;
                    this.trapsActivation[i] = true;
                }
            }
            //trap 0
            if (Math.abs(this.player.x - this.traps[46].x) < 50 && !this.trapsActivation[45])
                this.trapsActivation[46] = true;
            if (this.trapsActivation[46] && this.traps[46].y < 10000)
                this.traps[46].y += 5;
        };
        PlayScene.prototype.addWall = function (x, y) {
            var wall = new objects.Wall((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize);
            this.traps.push(wall);
            this.objects.push(wall);
        };
        PlayScene.prototype.addTrap = function (x, y) {
            var hand = new objects.hand((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize);
            this.hands.push(hand);
            this.traps.push(hand);
            this.objects.push(hand);
        };
        PlayScene.prototype.addInvisWall = function (x, y) {
            var wall = new objects.Wall((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize - 10000);
            this.walls.push(wall);
            this.traps.push(wall);
            this.objects.push(wall);
        };
        PlayScene.prototype.addInvisTrap = function (x, y) {
            var hand = new objects.hand((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize - 10000);
            this.hands.push(hand);
            this.traps.push(hand);
            this.objects.push(hand);
        };
        PlayScene.prototype.GenerateLevel = function () {
            this.initMap =
                [["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "end       ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "player    ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "fakewall  ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "fakewall  ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hiddenwall", "          ", "          ", "          ", "fakewall  ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "wall      ", "hands     ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "hands     ", "          ", "          ", "          ", "checkpoint", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenhand", "hiddenhand", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "ghost     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "hands     ", "hands     ", "wall      ", "          ", "          ", "wall      ", "          ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "hands     ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "checkpoint", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "ghost     ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "fakewall  ", "wall      ", "hands     ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "hands     ", "fakewall  ", "fakewall  ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenhand", "hiddenhand", "hiddenhand", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "fakewall  ", "fakewall  ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "          ", "wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenwall", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "hiddenwall", "hiddenwall", "hiddenwall", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenwall", "wall      ", "fakewall  ", "fakewall  ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "hiddenwall", "hiddenwall", "checkpoint", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "          ", "hiddenwall", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "hiddenwall", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hiddenhand", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "hiddenhand", "          ", "          ", "checkpoint", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "          ", "          ", "hands     ", "hands     ", "hands     ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          "]];
            for (var i = 0; i < 34; i++) {
                for (var j = 0; j < 40; j++) {
                    switch (this.initMap[i][j]) {
                        case "player    ":
                            this.player = new objects.Player((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.objects.push(this.player);
                            break;
                        case "wall      ":
                            var wall = new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.walls.push(wall);
                            this.objects.push(wall);
                            break;
                        case "checkpoint":
                            var cp = new objects.checkPoint((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.checkPoints.push(cp);
                            this.objects.push(cp);
                            break;
                        case "hands     ":
                            var hand = new objects.hand((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.hands.push(hand);
                            this.objects.push(hand);
                            break;
                        case "ghost     ":
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
        */
            this.updateTraps();
            switch (this.level) {
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