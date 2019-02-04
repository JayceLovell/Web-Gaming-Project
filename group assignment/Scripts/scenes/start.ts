module scenes {
    export class StartScene extends objects.Scene {
        // Variables
        private welcomeLabel: objects.Label;
        private startButton: objects.Button;

        // Constructors
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }
        // Methods
        private startButtonClick():void {
            objects.Game.currentScene = config.Scene.GAME;
        }

        // Use start function to create objects
        public Start(): void {
            this.welcomeLabel = new objects.Label("Miner Horror Never Ending Cause \n He  Failed To Win A Race In \n Part Two and Died In Part 1 \n So Now He Is in part three \n fighting for his life in hell \n against an annoying precision \n platformer", "32px", "Consolas", "#000000", 1800, 140, true);
            this.startButton = new objects.Button(this.assetManager, "startButton", 320, 400);
            this.Main();
        }

        public Update(): void {
        }

        public Main(): void {
            this.addChild(this.welcomeLabel);

            this.addChild(this.startButton);
            this.startButton.on("click", this.startButtonClick);
        }
    }
}