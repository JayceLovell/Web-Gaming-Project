module objects {
    export class Scene extends createjs.Container {
        // Variables
        public assetManager;

        // Constructors
        constructor(assetManager:createjs.LoadQueue) {
            super();

            this.assetManager = assetManager;
        }
        // Methods
        public Start():void {

        }

        // Going to be called from the game's update function. Think of this as the game loop
        public Update():void {
            
        }

        public Main(): void {

        }
    }
}