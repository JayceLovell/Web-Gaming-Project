module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private playLabel: objects.Label;
        private nextButton: objects.Button;
        private backButton: objects.Button;
        private backGroundImage: objects.Image;

        private player:objects.Player;

        private floor:objects.Wall;
        
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }
        // Methods
        public Start(): void {
            this.playLabel = new objects.Label("Game Playing", "40px", "Consolas", "#FFFFFF", 320, 100, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 340);
            this.backButton = new objects.Button(this.assetManager, "backButton", 140, 340);
            this.backGroundImage = new objects.Image(this.assetManager,"backGroundImagePlay",320, 400);
            this.floor = new objects.Wall(this.assetManager,"wall",250,400);
            this.player = new objects.Player(this.assetManager);

            this.Main();

        }

        public Update(): void {
            this.player.Update();

            this.backButton.setX(this.backButton.getX() + 5);

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



        }
50
        // Button Even Handlers
        private nextButtonClick():void {
            objects.Game.currentScene = config.Scene.OVER;
        }

        private quitButtonClick():void {
            objects.Game.currentScene = config.Scene.START;
        }

        public Main(): void {
            //this.addChild(this.backGroundImage);
            this.addChild(this.playLabel);
            //this.addChild(this.nextButton);
            //this.addChild(this.backButton);
            this.addChild(this.floor);
            this.addChild(this.player);

            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.quitButtonClick);
        }
    }
}