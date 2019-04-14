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
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 340);
            this.backButton = new objects.Button(this.assetManager, "backButton", 140, 340);
            this.backGroundImage = new objects.Image(this.assetManager, "backGroundImagePlay", 320, 400);
            this.tileSize = 48;
            this.objects = new Array();
            this.walls = new Array();
            this.checkPoints = new Array();
            this.hands = new Array();
            this.ghosts = new Array();
            this.traps = new Array();
            this.level = 1;
            this.trapsActivation = new Array();
            for (var i = 0; i < 1000; i++) { //trap length
                this.trapsActivation.push(false);
            }
            this.trap2Progress = 0;
            this.GenerateLevel();
            this.GenerateTraps();
            this.shiftObjectsDown();
            this.Main();
        };
        PlayScene.prototype.shiftObjectsDown = function () {
            this.hands.forEach(function (hand) {
                hand.y = hand.y + 8;
            });
            this.checkPoints.forEach(function (checkPoint) {
                checkPoint.y = checkPoint.y + 8;
            });
        };
        PlayScene.prototype.GenerateTraps = function () {
            //hidden spikes in walls
            this.addWall(7, 14);
            this.addWall(13, 7);
            this.addWall(14, 7);
            this.addWall(15, 7);
            this.addWall(15, 18);
            this.addWall(22, 23);
            this.addWall(22, 24);
            this.addWall(23, 23);
            this.addWall(23, 24);
            this.addWall(23, 4);
            this.addWall(30, 31);
            this.addWall(31, 17);
            this.addWall(34, 14); //13-
            //invisible walls  
            this.addInvisWall(10, 11);
            this.addInvisWall(20, 24);
            this.addInvisWall(20, 25);
            this.addInvisWall(20, 26);
            this.addInvisWall(34, 6); //18-
            //fake walls
            this.addWall(13, 18);
            this.addWall(22, 9);
            this.addWall(22, 21);
            this.addWall(22, 22);
            this.addWall(22, 25);
            this.addWall(23, 21);
            this.addWall(23, 22);
            this.addWall(23, 25);
            this.addWall(34, 24);
            this.addWall(34, 25);
            this.addWall(35, 24);
            this.addWall(35, 25);
            this.addWall(36, 24);
            this.addWall(36, 25);
            this.addWall(38, 5);
            this.addWall(38, 6);
            this.addWall(38, 7); //35-
            //invisible traps
            this.addInvisTrap(28, 15);
            this.addInvisTrap(28, 16);
            this.addInvisTrap(28, 17);
            this.addInvisTrap(29, 15);
            this.addInvisTrap(29, 16);
            this.addInvisTrap(29, 17);
            this.addInvisTrap(31, 21);
            this.addInvisTrap(32, 21);
            this.addInvisTrap(33, 21);
            this.addInvisTrap(33, 27);
            this.addInvisTrap(33, 28); //45-
            //trap 0
            this.addTrap(8, 10); //46
            //trap 1
            this.addInvisWall(10, 22); //47
            this.addTrap(14, 16);
            this.addTrap(14, 17);
            this.addTrap(15, 16);
            this.addTrap(15, 17);
            this.addTrap(16, 16);
            this.addTrap(16, 17); //53
            //trap 2
            this.addTrap(26, 21);
            this.addTrap(27, 20);
            this.addTrap(28, 21);
            this.addWall(26, 21);
            this.addWall(28, 21); //58
            //trap 3
            this.addInvisTrap(35, 11); //59
            //trap 4
            this.addInvisTrap(17, 7);
            this.addInvisTrap(17, 8); //61
            //trap 5
            this.addTrap(9, 2);
            this.addTrap(9, 3); //63
        };
        PlayScene.prototype.updateTraps = function () {
            //hidden traps in walls
            for (var i = 0; i < 13; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y = -10000;
                    this.trapsActivation[i] = true;
                }
            }
            //invis wall
            for (var i = 13; i < 18; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y - 10000) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y += 10000;
                    this.trapsActivation[i] = true;
                }
            }
            //fake walls
            for (var i = 18; i < 35; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y = -10000;
                    this.trapsActivation[i] = true;
                }
            }
            //invis spikes
            for (var i = 35; i < 46; i++) {
                if (Math.abs(this.player.x - this.traps[i].x) < 50 && Math.abs(this.player.y - this.traps[i].y - 10000) < 50 && !this.trapsActivation[i]) {
                    this.traps[i].y += 10000;
                    this.trapsActivation[i] = true;
                }
            }
            //trap 0
            if (Math.abs(this.player.x - this.traps[46].x) < 50 && !this.trapsActivation[46])
                this.trapsActivation[46] = true;
            if (this.trapsActivation[46] && this.traps[46].y < 10000)
                this.traps[46].y += 5;
            //trap 1
            if (this.player.x > this.traps[47].x + this.tileSize * 20 && this.player.y < this.traps[47].y + 10000 + this.tileSize * 3 && !this.trapsActivation[47]) {
                this.traps[47].y += 10000;
                for (var i = 48; i < 54; i++) {
                    this.traps[i].y = -10000;
                }
                this.trapsActivation[47] = true;
            }
            //trap2
            if (this.player.x > this.traps[54].x - 50 && this.player.y > this.traps[54].y - this.tileSize * 3 && this.player.y < this.traps[54].y - this.tileSize && !this.trapsActivation[48]) {
                this.trapsActivation[48] = true;
            }
            if (this.trapsActivation[48] && !this.trapsActivation[49]) {
                this.traps[54].y -= 2;
                this.traps[56].y -= 2;
                this.trap2Progress += 2;
                if (this.trap2Progress >= this.tileSize) {
                    this.trapsActivation[49] = true;
                }
            }
            if (this.trapsActivation[49] && this.trap2Progress <= this.tileSize * 2) {
                for (var i = 54; i < 57; i++) {
                    this.traps[i].x += 3;
                    this.trap2Progress += 2;
                }
            }
            //trap3   
            if (!this.trapsActivation[50] && this.player.y < this.traps[59].y + 10000 - this.tileSize * 3 && this.player.x > this.traps[59].x - this.tileSize * 2) {
                console.log("trigger");
                this.traps[59].y += 10000;
                this.trapsActivation[50] = true;
            }
            //trap4
            if (this.player.x > this.traps[60].x && this.player.x < this.traps[60].x + this.tileSize * 2 && this.player.y < this.traps[60].y + this.tileSize * 3 + 10000 && !this.trapsActivation[51]) {
                this.traps[60].y += 10000;
                this.traps[61].y += 10000;
                this.trapsActivation[51] = true;
            }
            //trap5
            if (this.player.x > this.traps[62].x && this.player.y < this.traps[62].y + this.tileSize && !this.trapsActivation[52]) {
                this.trapsActivation[52] = true;
            }
            if (this.trapsActivation[52]) {
                this.traps[62].x += 1;
                this.traps[63].x += 1;
            }
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
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "player    ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "checkpoint", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "ghost     ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "hands     ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "hands     ", "hands     ", "wall      ", "          ", "          ", "wall      ", "          ", "hands     ", "wall      ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "checkpoint", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "checkpoint", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "hands     ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "hands     ", "wall      ", "          ", "          ", "          ", "wall      ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "ghost     ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "checkpoint", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "          ", "hiddenwall", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "hiddenwall", "hiddenwall", "hiddenwall", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "hiddenwall", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "hiddenwall", "hiddenwall", "checkpoint", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "hiddenwall", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "hands     ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "checkpoint", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "          ", "          ", "hands     ", "hands     ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
                    ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "]];
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
                            var ghost = new objects.Ghost((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize, this.tileSize);
                            this.ghosts.push(ghost);
                            this.objects.push(ghost);
                            break;
                        case "end       ":
                            this.end = new objects.End((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.objects.push(this.end);
                            break;
                        default:
                            break;
                    }
                }
            }
            this.lastCheckpoint = this.checkPoints[1];
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            this.player.Update();
            this.ghosts.forEach(function (ghost) {
                ghost.Update();
            });
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
                        if (_this.player.vSpeed < 0.5)
                            _this.player.vSpeed = 0.5;
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
                    _this.lastCheckpoint = checkPoint;
                }
            });
            this.hands.forEach(function (hand) {
                if (managers.AABBCollisions.Check(_this.player, hand)) {
                    _this.player.x = _this.lastCheckpoint.x;
                    _this.player.y = _this.lastCheckpoint.y;
                    _this.moveScreen(_this.lastCheckpoint.index);
                }
            });
            this.ghosts.forEach(function (ghost) {
                if (managers.AABBCollisions.Check(_this.player, ghost)) {
                    _this.player.x = _this.lastCheckpoint.x;
                    _this.player.y = _this.lastCheckpoint.y;
                    _this.moveScreen(_this.lastCheckpoint.index);
                }
            });
            if (managers.AABBCollisions.Check(this.end, this.player)) {
                objects.Game.currentScene = config.Scene.OVER;
            }
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
                default:
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
                            this.ghosts.forEach(function (o) {
                                o.xmin -= _this.tileSize * 20;
                                o.xmax -= _this.tileSize * 20;
                            });
                            break;
                        case 4:
                            this.objects.forEach(function (o) {
                                o.x -= _this.tileSize * 20;
                                o.y -= _this.tileSize * 17;
                            });
                            this.ghosts.forEach(function (o) {
                                o.xmin -= _this.tileSize * 20;
                                o.xmax -= _this.tileSize * 20;
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
                            this.ghosts.forEach(function (o) {
                                o.xmin -= _this.tileSize * 20;
                                o.xmax -= _this.tileSize * 20;
                            });
                            break;
                        case 4:
                            this.objects.forEach(function (o) {
                                o.x -= _this.tileSize * 20;
                            });
                            this.ghosts.forEach(function (o) {
                                o.xmin -= _this.tileSize * 20;
                                o.xmax -= _this.tileSize * 20;
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
                            this.ghosts.forEach(function (o) {
                                o.xmin += _this.tileSize * 20;
                                o.xmax += _this.tileSize * 20;
                            });
                            break;
                        case 2:
                            this.objects.forEach(function (o) {
                                o.x += _this.tileSize * 20;
                                o.y -= _this.tileSize * 17;
                            });
                            this.ghosts.forEach(function (o) {
                                o.xmin += _this.tileSize * 20;
                                o.xmax += _this.tileSize * 20;
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
                            this.ghosts.forEach(function (o) {
                                o.xmin += _this.tileSize * 20;
                                o.xmax += _this.tileSize * 20;
                            });
                            break;
                        case 2:
                            this.objects.forEach(function (o) {
                                o.x += _this.tileSize * 20;
                            });
                            this.ghosts.forEach(function (o) {
                                o.xmin += _this.tileSize * 20;
                                o.xmax += _this.tileSize * 20;
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