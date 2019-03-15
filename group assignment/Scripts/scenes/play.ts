module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private playLabel: objects.Label;
        private nextButton: objects.Button;
        private backButton: objects.Button;
        private backGroundImage: objects.Image;
        private tileSize: number;

        private player: objects.Player;


        private win: objects.GameObject;

        //private walls:objects.wall[];
        private ghost: objects.ghost[];
        private hands: objects.ghost[];
        private checkPoint: objects.checkPoint[];
        private checkPointIndex: number;
        private initMap: string[][];
        //private gameobjects:objects.GameObject[];
        private walls: Array<objects.GameObject>;
        private floors: Array<objects.GameObject>;
        // Constructor
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }
        // Methods
        public Start(): void {
            this.playLabel = new objects.Label("Game Playing", "40px", "Consolas", "#FFFFFF", 320, 100, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 340);
            this.backButton = new objects.Button(this.assetManager, "backButton", 140, 340);
            this.backGroundImage = new objects.Image(this.assetManager, "backGroundImagePlay", 320, 400);
            this.checkPointIndex = 0;
            this.tileSize = 32;
            this.walls = new Array();
            this.floors = new Array();


            // add in the player, walls. ghost, hands, checkpoint and win gameobjects into the scene
            //this.floor = new objects.Wall(250,400);
            this.GenerateLevel(1);
            this.Main();

        }

        public GenerateLevel(level: number): void {
            //map is 40 by 34. cut map into 4 pieces of 20 by 17. 
            switch (level) {
                //14 by
                case 1:
                    this.initMap = [["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "hands", "", "", "", "", "", "hands", "", "", "", ""],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "hands", "", "", "hands", "", "", "", "", "", "hands", "hands"],
                    ["wall", "wall", "", "", "player", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "", "", "", "", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "hands", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "green", "", "", "", "wall", "wall", "wall", "wall", "wall", ""],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "", ""],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "", ""],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "", "", ""],
                    ["wall", "floor", "floor", "floor", "floor", "floor", "floor", "floor", "floor", "floor", "", "", "", "", "wall", "wall", "wall", "", "", ""]
                    ];
                    break;
                default:
                    break;
            }


            for (var i = 0; i < 17; i++) {
                for (var j = 0; j < 20; j++) {
                    switch (this.initMap[i][j]) {
                        case "wall":
                            this.walls.push(new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize));
                            break;
                        case "floor":
                            this.floors.push(new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize));
                            break;
                        case "player":
                            this.player = new objects.Player((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            break;
                        default:
                            break;
                    }
                }
            }

        }

        public Update(): void {
            this.player.Update();

            this.backButton.setX(this.backButton.getX() + 5);

            //this.backButton.setX(this.backButton.getX() + 5);

            // this.walls.forEach(wall => {
            //     if (managers.AABBCollisions.Check(this.player, wall)) {
            //         if (this.player.y >= wall.y) {
            //             if (this.player.x >= wall.x) {
            //                 if ((this.player.x - this.player.halfW) - (wall.x + wall.halfW) <= (wall.y - wall.halfH) - (this.player.y + this.player.halfH)) {
            //                     this.player.y = wall.y + (wall.regY + (wall.height / 2));
            //                 }
            //             } else {
            //                 if ((this.player.x + this.player.halfW) - (wall.x + wall.halfW) <= (wall.y - wall.halfH) - (this.player.y + this.player.halfH)) {
            //                     this.player.y = wall.y + (wall.regY + (wall.height / 2));
            //                 }
            //             }
            //         } 
            //         else {
            //             if (this.player.x >= wall.x) {
            //                 if ((this.player.x + this.player.halfW) - (wall.x + wall.halfW) >= (wall.y - wall.halfH) - (this.player.y + this.player.halfH)) {
            //                     this.player.y = wall.y - (wall.regY + (wall.height / 2));
            //                 }
            //             } else {
            //                 if ((this.player.x + this.player.halfW) - (wall.x + wall.halfW) >= (wall.y - wall.halfH) - (this.player.y + this.player.halfH)) {
            //                     this.player.y = wall.y + (wall.regY + (wall.height / 2));
            //                 }
            //             }
            //         }
            this.walls.forEach(wall => {
                if (managers.AABBCollisions.Check(this.player, wall)) {
                    if (this.player.x >= wall.x)
                        this.player.x = wall.x + (wall.regX + (wall.halfW));
                    else
                        this.player.x = wall.x - (wall.regX + (wall.halfW));

                    // if(this.player.x >= wall.x){
                    //     if((this.player.y+ this.player.halfH)  -(wall.y +wall.halfH) <= (wall.x - wall.halfW) - (this.player.x + this.player.halfW)) {

                    //         if(this.player.y >= wall.y){
                    //             this.player.x = wall.x + (wall.width/2);
                    //         }else{

                    //         }
                    //     }
                    // }else if(this.player.x <= wall.x ){
                    //         this.player.x = wall.x-(wall.width/2);
                    // }

                }
            });
            this.floors.forEach(floor => {
                if (managers.AABBCollisions.Check(this.player, floor)) {
                    if (this.player.x >= floor.x)
                        this.player.y = floor.y - (floor.regY + (floor.halfH));
                    else
                        this.player.y = floor.y + (floor.regY + (floor.halfH));

                }

            });
            /*
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
            /*
                        this.player.colliding = managers.AABBCollisions.Check(this.player,this.floor);
            
                        if(this.player.colliding) {
                            if(this.player.y >= this.floor.y ){
                                this.player.y = this.floor.y + (this.floor.regY +(this.floor.height/2));
                            }else{
                                this.player.y = this.floor.y - (this.floor.regY +(this.floor.height/2));
            
                            }
                            
                            
                            //this.backgroundMusic.stop();
                            //objects.Game.currentScene = config.Scene.OVER;
                        }
            
            */
        }
        50
        // Button Even Handlers
        private nextButtonClick(): void {
            objects.Game.currentScene = config.Scene.OVER;
        }

        private quitButtonClick(): void {
            objects.Game.currentScene = config.Scene.START;
        }

        public Main(): void {
            //this.addChild(this.backGroundImage);
            this.addChild(this.playLabel);
            this.addChild(this.player);

            this.walls.forEach(x => {
                this.addChild(x)
            });
            this.floors.forEach(x => {
                this.addChild(x)
            });

            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.quitButtonClick);
        }
    }
}