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
            this.welcomeLabel = new objects.Label("Welcome!", "60px", "Consolas", "#000000", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "startButton", 320, 300);
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