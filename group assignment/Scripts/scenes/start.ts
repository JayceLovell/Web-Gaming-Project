module scenes {
    export class StartScene extends objects.Scene {
        // Variables
        private welcomeLabel: objects.Label;
        private buttonLabel: objects.Label;
        private startButton: objects.Button;
        private bgImage: objects.Image;


        // Constructors
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }
        // Methods
        private startButtonClick(): void {
            objects.Game.currentScene = config.Scene.GAME;
        }

        // Use start function to create objects
        public Start(): void {
            this.welcomeLabel = new objects.Label("Miner Horror Never Ending Cause \n He  Failed To Win A Race In \n Part Two and Died In Part 1 \n So Now He Is in part three \n fighting for his life in hell \n against an annoying precision \n platformer", "32px", "Consolas", "#FFFFFF", 1920, 140, true);
            this.buttonLabel = new objects.Label("Start Game", "30px", "Consolas", "#FFFFFF", 480, 395, true);
            this.startButton = new objects.Button(this.assetManager, "startButton", 480, 400);
            this.bgImage = new objects.Image(this.assetManager, "backGroundImageMain", 480, 400);
            this.Main();
        }

        public Update(): void {
        }

        public Main(): void {
            this.addChild(this.bgImage);
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            this.addChild(this.buttonLabel);
            this.startButton.on("click", this.startButtonClick);
        }
    }
}