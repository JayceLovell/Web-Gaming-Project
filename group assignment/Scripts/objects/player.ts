module objects {
    export class Player extends objects.GameObject {
        // Variables
        public isDead:boolean;
        public speed:number;
        public vSpeed:number;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "player");
            this.Start();
        }
        // Methods / functions
        public Start():void {
            this.y = 700;

            this.isDead = false;
 
            this.x = 100;
            this.speed = 5;
            this.vSpeed = 1;
        }

        public Update():void {
            this.Move();
            this.CheckBounds();

            if(this.vSpeed < 5){
                this.vSpeed +=0.12;

            }
            this.y += this.vSpeed;
        }

        public Reset():void {}

        public Move():void {
            //this.x = objects.Game.stage.mouseX; // objects.Game.stage is a global variable

            if(objects.Game.keyboardManager.moveLeft){
                this.x -= this.speed;
            }

            if(objects.Game.keyboardManager.moveRight){
                this.x += this.speed;
            }

            if(objects.Game.keyboardManager.moveUp){
                //this.y -= 1;
                // if(this.vSpeed >0){
                //     this.vSpeed *= -1;

                // }
            }

            if(objects.Game.keyboardManager.moveDown){
                this.y += this.speed;
            }
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