module objects {
    export class Player extends objects.GameObject {
        // Variables
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "player");
            this.Start();
        }
        // Methods / functions
        public Start():void {
            this.y = 700;
        }

        public Update():void {
            this.Move();
            this.CheckBounds();
        }

        public Reset():void {}

        public Move():void {
            this.x = objects.Game.stage.mouseX; // objects.Game.stage is a global variable
        }

        public CheckBounds():void {
            // Check right boundary
            if(this.x >= 600 - this.halfW) {
                this.x = 600 - this.halfW;
            }

            // Check left boundary
            if(this.x <= this.halfW) {
                this.x = this.halfW;
            }
        }
    }
}