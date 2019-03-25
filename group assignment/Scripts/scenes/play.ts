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
        private trapsActivation: Array<boolean>;
        
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
            this.trapsActivation=new Array();
            for(var i:number = 0; i<1000; i++){ //trap length
               this.trapsActivation.push(false);
            } 
            this.GenerateLevel();
            this.GenerateTraps();
            this.Main();
        }
        public GenerateTraps(): void {
            //hidden spikes in walls
            this.addFakeWall(7,16);//0
            this.addFakeWall(15,20);
            this.addFakeWall(22,25);
            this.addFakeWall(22,26);
            this.addFakeWall(23,25);
            this.addFakeWall(23,26);//5
            this.addFakeWall(28,19);
            this.addFakeWall(28,18);
            this.addFakeWall(28,17);
            this.addFakeWall(29,19);
            this.addFakeWall(29,18);//10
            this.addFakeWall(29,17);
            this.addFakeWall(30,31);
            this.addFakeWall(31,19);
            this.addFakeWall(34,16);
            this.addFakeWall(13,9);//15
            this.addFakeWall(14,9);
            this.addFakeWall(15,9);
            this.addFakeWall(23,6);
            //invisible walls
            this.addInvisWall(10,13);
            this.addInvisWall(20,29);//20
            this.addInvisWall(20,30);
            this.addInvisWall(20,31);
            this.addInvisWall(33,9);
            //fake walls
            this.addFakeWall(13,20);
            this.addFakeWall(22,11);//25
            this.addFakeWall(22,23);
            this.addFakeWall(22,24);
            this.addFakeWall(22,27);
            this.addFakeWall(23,23);
            this.addFakeWall(23,24);//30
            this.addFakeWall(23,27);
            this.addFakeWall(34,26);
            this.addFakeWall(34,27);
            this.addFakeWall(35,26);
            this.addFakeWall(35,27);//35
            this.addFakeWall(36,26);
            this.addFakeWall(36,27);
            this.addFakeWall(37,7);
            this.addFakeWall(37,8);
            this.addFakeWall(37,9);//40
            this.addInvisTrap(20,23);
            this.addInvisTrap(21,23);
            this.addInvisTrap(22,23);
            this.addInvisTrap(22,29);
            this.addInvisTrap(22,30);//45
            //trap 0
            
        }

        public updateTraps(): void {
            //hidden traps in walls
            for(var i:number = 0; i<18; i++){ 
                if(Math.abs(this.player.x-this.traps[i].x)<50&&Math.abs(this.player.y-this.traps[i].y)<50&&!this.trapsActivation[i]){
                    this.traps[i].y=-10000;
                    this.trapsActivation[i]=true;
                }
            } 
            //invis wall
            for(var i:number = 18; i<23; i++){ 
                if(Math.abs(this.player.x-this.traps[i].x)<50&&Math.abs(this.player.y-this.traps[i].y-10000)<50&&!this.trapsActivation[i]){
                    this.traps[i].y+=10000;
                    this.trapsActivation[i]=true;
                }                    
            } 
            //fake walls
            for(var i:number = 23; i<40; i++){ 
                if(Math.abs(this.player.x-this.traps[i].x)<50&&Math.abs(this.player.y-this.traps[i].y)<50&&!this.trapsActivation[i]){
                    this.traps[i].y=-10000;
                    this.trapsActivation[i]=true;
                }
            } 
            //invis spikes
            for(var i:number = 40; i<45; i++){ 
                if(Math.abs(this.player.x-this.traps[i].x)<50&&Math.abs(this.player.y-this.traps[i].y-10000)<50&&!this.trapsActivation[i]){
                    this.traps[i].y+=10000;
                    this.trapsActivation[i]=true;
                }                    
            } 
            //trap 0
        }
        public addFakeWall(x:number,y:number):void{
            var wall=new objects.Wall((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize);
            this.traps.push(wall);
            this.objects.push(wall);
        }
        public addInvisWall(x:number,y:number):void{
            var wall=new objects.Wall((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize -10000);
            this.walls.push(wall);
            this.traps.push(wall);
            this.objects.push(wall);
        }
        public addInvisTrap(x:number,y:number):void{
            var hand=new objects.hand((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize -10000);
            this.hands.push(hand);
            this.traps.push(hand);
            this.objects.push(hand);
        }

        public GenerateLevel(): void {
           this.initMap = 
          [["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "end       ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ","          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ","          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "player    ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "fakewall  ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "fakewall  ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ","          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hiddenwall", "          ", "          ", "          ", "fakewall  ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ","          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "hands     ", "          ", "          ", "          ", "checkpoint", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "          ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "          ", "wall      ","wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenhand", "hiddenhand", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "hands     ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","          ", "          ", "          ", "ghost     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hiddenwall", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ","          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ","          ", "          ", "          ", "          ", "wall      ", "hands     ", "hands     ", "wall      ", "          ", "          ", "wall      ", "          ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ","wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "hands     ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ","wall      ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "hands     ", "          ", "          ", "checkpoint","          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "ghost     ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "hands     ", "          ", "          ", "wall      ","          ", "          ", "          ", "          ", "          ", "          ", "          ", "hands     ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "fakewall  ", "wall      ", "hands     ", "wall      ", "          ", "          ", "          ","wall      ", "hands     ", "fakewall  ", "fakewall  ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenhand", "hiddenhand", "hiddenhand", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ","wall      ", "wall      ", "fakewall  ", "fakewall  ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "          ","wall      ", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hiddenwall", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","hiddenwall", "wall      ", "hands     ", "hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "hiddenwall", "hiddenwall", "hiddenwall", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","hiddenwall", "wall      ", "fakewall  ", "fakewall  ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "hiddenwall", "hiddenwall", "checkpoint", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "hands     ", "          ", "          ", "          ","hiddenwall", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ","          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "hiddenhand", "          ", "          ", "          ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "wall      ", "wall      ", "          ", "          ", "          ", "          ","          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "          ", "hands     ", "hands     ", "          ", "          ", "          ", "hiddenhand", "          ", "          ", "checkpoint", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ", "          ","hands     ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "hands     ", "hands     ", "hands     ", "          ", "          ", "hands     ", "hands     ", "hands     ", "hands     ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          "],
           ["wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ","wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "wall      ", "          ", "          ", "          ", "          ", "          "]];
            


            
            for (var i = 0; i < 34; i++) {
                for (var j = 0; j < 40; j++) {
                    switch (this.initMap[i][j]) {
                        case "player    ":
                            this.player = new objects.Player((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.objects.push(this.player);
                            break;
                        case "wall      ":
                            var wall=new objects.Wall((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.walls.push(wall);
                            this.objects.push(wall);
                            break;
                        case "checkpoint":
                            var cp=new objects.checkPoint((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
                            this.checkPoints.push(cp);
                            this.objects.push(cp);
                            break;
                        case "hands     ":
                            var hand=new objects.hand((j + 0.5) * this.tileSize, (i + 0.5) * this.tileSize);
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