module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private playLabel: objects.Label;
        private nextButton: objects.Button;
        private backButton: objects.Button;
        private backGroundImage: objects.Image;
        private tileSize: number;
        private level: number;
        private initMap: string[][];
        private player: objects.Player;
        private objects: Array<objects.GameObject>;
        private walls: Array<objects.Wall>;
        private checkPoints: Array<objects.checkPoint>;
        private checkPointX: number;
        private checkPointY: number;
        private checkPointLevel:number;
        private hands: Array<objects.hand>;
        private ghosts: Array<objects.ghost>;
        private traps: Array<objects.GameObject>;
        private trapsActivation: boolean[];
        
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
            this.tileSize = 32;
            this.objects = new Array();
            this.walls = new Array();
            this.checkPoints=new Array();
            this.hands = new Array();
            this.ghosts=new Array();
            this.traps=new Array();
            this.level=1;
            this.checkPointLevel=this.level;
            this.trapsActivation=[false,false,false]; 
            this.GenerateLevel();
            this.GenerateTraps();
            this.Main();
        }
        public GenerateTraps(): void {
            //hidden spikes
            this.instantiateHiddenHand(7,16);
            //trap 0
            
        }

        public updateTraps(): void {
            //hidden traps
            for(var i:number = 0; i<1; i++){ 
                if(Math.abs(this.player.x-this.traps[i].x)<50&&Math.abs(this.player.y-this.traps[i].y)<50)
                    this.trapsActivation[i]=true;

                if(this.trapsActivation[i])
                    this.traps[i].y=-10000;
            } 
            //trap 0
        }
        public instantiateHiddenHand(x:number,y:number):void{
            var wall=new objects.Wall((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize);
            this.traps.push(wall);
            this.objects.push(wall);
        }

        public GenerateLevel(): void {
                    this.initMap = [["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall", "wall", "wall", "wall", "wall", "", "end", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "hands", "", "", "", "", "", "hands", "", "", "", "","", "", "", "hands", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "hands", "", "", "hands", "", "", "", "", "", "hands", "hands","", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "player", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "light green", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "", "", "", "", "", "", "", "", "light green", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "wall", "wall", "", "", "", "", "wall", "wall","", "", "hands", "", "", "", "", "", "", "", "", "", "", "", "green", "", "", "", "light green", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "", "wall","", "", "", "", "", "", "", "hands", "hands", "hands", "", "", "", "checkpoint", "wall", "", "", "", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "", "wall","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "", "wall","wall", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall","", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "deep blue", "deep blue", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "hands", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall","", "", "", "ghost", "", "", "", "", "", "", "", "wall", "", "", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "green", "", "", "", "wall", "wall", "wall", "wall", "wall", "","", "", "", "", "", "", "", "wall", "", "", "wall", "", "", "", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "", "","", "", "", "", "wall", "hands", "hands", "wall", "", "", "wall", "", "hands", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "", "","wall", "wall", "hands", "hands", "wall", "wall", "wall", "wall", "", "", "wall", "", "", "", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall", "", "", "","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "wall", "", "", "", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "hands", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "", "", "","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "", "", "","wall", "", "", "hands", "", "", "", "", "", "", "", "", "", "", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "", "", "wall", "wall", "wall", "", "", "", "", "hands", "hands", "hands", "", "", "checkpoint","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "gray", "wall", "wall", "wall"],
                    ["wall", "wall", "", "", "", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "hands", "hands", "hands", "", "", "wall","", "", "", "", "", "", "", "hands", "", "", "", "", "", "", "", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "hands", "hands", "hands", "wall", "wall", "wall", "wall", "wall", "", "", "", "light green", "wall", "wall", "wall", "", "", "","wall", "hands", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "purple", "purple", "purple", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "", "", "","wall", "wall", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "hands", "hands", "","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "green", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall","green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "green", "green", "green", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall","green", "wall", "light green", "light green", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "green", "green", "checkpoint", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "hands", "", "", "","green", "", "", "", "wall", "wall", "", "", "wall", "", "", "", "", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "wall", "wall", "wall", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "purple", "", "", "", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "wall", "wall", "", "", "", "","", "", "hands", "hands", "", "", "", "", "hands", "hands", "", "", "", "purple", "", "", "checkpoint", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", "", "", "", "", "","hands", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "hands", "hands", "hands", "", "", "hands", "hands", "hands", "hands","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", ""],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", ""],
                    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "", "", "", "", ""]];
            for (var i = 0; i < 34; i++) {
                for (var j = 0; j < 40; j++) {
                    switch (this.initMap[i][j]) {
                        case "player":
                            this.player = new objects.Player((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.objects.push(this.player);
                            break;
                        case "wall":
                            var wall=new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.walls.push(wall);
                            this.objects.push(wall);
                            break;
                        case "checkpoint":
                            var cp=new objects.checkPoint((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.checkPoints.push(cp);
                            this.objects.push(cp);
                            break;
                        case "hands":
                            var hand=new objects.hand((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
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
            this.checkPointX=this.player.x;
            this.checkPointY=this.player.y;
        }

        public Update(): void {
            this.player.Update();

            this.backButton.setX(this.backButton.getX() + 5);
            
            this.player.colliding= false;
            this.walls.forEach(wall => {
                if (managers.AABBCollisions.Check(this.player, wall)) {
                    if (managers.AABBCollisions.checKSides(this.player, wall) == 1){
                        this.player.y = wall.y - wall.halfH - this.player.halfH +0.1;
                        this.player.colliding =true;
                    }
                    else if(managers.AABBCollisions.checKSides(this.player, wall) == 2){
                        this.player.y = wall.y + wall.halfH + this.player.halfH - 0.1;
                    }
                    else if(managers.AABBCollisions.checKSides(this.player, wall) == 3){
                        this.player.x = wall.x+ wall.halfW+ this.player.halfW+0.1;
                    }
                    else if(managers.AABBCollisions.checKSides(this.player, wall) == 4){
                        this.player.x = wall.x- wall.halfW- this.player.halfW-0.1;
                    }
                }
            });
            this.checkPoints.forEach(checkPoint => {
                if(managers.AABBCollisions.Check(this.player, checkPoint)){
                    this.checkPointX=checkPoint.x;
                    this.checkPointY=checkPoint.y;
                    this.checkPointLevel=this.level;
                }
            });
            
            this.hands.forEach(hand => {
                if(managers.AABBCollisions.Check(this.player, hand)){
                    this.player.x=this.checkPointX;
                    this.player.y=this.checkPointY;
                    this.moveScreen(this.checkPointLevel);
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
       
        switch(this.level){
            case 1:
                if(this.player.y>this.tileSize*17){
                    this.moveScreen(2);
                }else if(this.player.x>this.tileSize*20){
                    this.moveScreen(3);
                }
            break;
            case 2:
                if(this.player.y<0){
                    this.moveScreen(1);
                }else if(this.player.x>this.tileSize*20){
                    this.moveScreen(4);
                }
            break;
            case 3:
                if(this.player.y>this.tileSize*17){
                    this.moveScreen(4);
                }else if(this.player.x<0){
                    this.moveScreen(1);
                }
            break;
            case 4: 
                if(this.player.y<0){
                    this.moveScreen(3);
                }else if(this.player.x<0){
                    this.moveScreen(2);
                }
            break;
        }

        }
        // Button Even Handlers
        private nextButtonClick(): void {
            objects.Game.currentScene = config.Scene.OVER;
        }

        private quitButtonClick(): void {
            objects.Game.currentScene = config.Scene.START;
        }

        public Main(): void {
            //this.addChild(this.backGroundImage);
            this.objects.forEach(x => {
                this.addChild(x)
            });
            this.addChild(this.playLabel);
            
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.quitButtonClick);
        }
        public moveScreen(targetLevel:number):void {
            switch(this.level){
                case 1:
                    switch(targetLevel){
                        case 2:
                            this.objects.forEach(o => {
                                o.y-=this.tileSize*17;
                            });
                        break;
                        case 3:
                            this.objects.forEach(o => {
                                o.x-=this.tileSize*20;
                            });
                        break;
                        case 4:
                        this.objects.forEach(o => {
                            o.x-=this.tileSize*20;
                            o.y-=this.tileSize*17;
                        });
                        break;
                    }
                break;
                case 2:
                    switch(targetLevel){
                        case 1:
                            this.objects.forEach(o => {
                                o.y+=this.tileSize*17;
                            });
                        break;
                        case 3:
                            this.objects.forEach(o => {
                                o.x-=this.tileSize*20;
                                o.y+=this.tileSize*17;
                            });
                        break;
                        case 4:
                        this.objects.forEach(o => {
                            o.x-=this.tileSize*20;
                        });
                        break;
                    }
                break;
                case 3:
                    switch(targetLevel){
                        case 1:
                            this.objects.forEach(o => {
                                o.x+=this.tileSize*20;
                            });
                        break;
                        case 2:
                            this.objects.forEach(o => {
                                o.x+=this.tileSize*20;
                                o.y-=this.tileSize*17;
                            });
                        break;
                        case 4:
                        this.objects.forEach(o => {
                            o.y-=this.tileSize*17;
                        });
                        break;
                    }
                break;
                case 4: 
                    switch(targetLevel){
                        case 1:
                            this.objects.forEach(o => {
                                o.x+=this.tileSize*20;
                                o.y+=this.tileSize*17;
                            });
                        break;
                        case 2:
                            this.objects.forEach(o => {
                                o.x+=this.tileSize*20;
                            });
                        break;
                        case 3:
                        this.objects.forEach(o => {
                            o.y+=this.tileSize*17;
                        });
                        break;
                    }
                break;}
            this.level=targetLevel;
        }
    }
}