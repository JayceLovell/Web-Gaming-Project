module objects {
    export class Player extends objects.GameObject {
        // Variables
        public colliding:boolean;
        public speed:number;
        public vSpeed:number;
        public previousX;
        public previousY;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "player");
            this.Start();
        }
        // Methods / functions
        public Start():void {
            this.y = 50;

            this.colliding = false;
 
            this.x = 50;
            this.speed = 5;
            this.vSpeed = 1;
            this.previousX=this.x;
            this.previousY=this.y;
        }

        public Update():void {
            this.previousX=this.x;
            this.previousY=this.y;
            this.Move();
            this.CheckBounds();

            if(this.vSpeed < 5){
                this.vSpeed +=0.12;
            }
            this.y += this.vSpeed;
        }

        public Reset():void {}

        public Move():void {

            if(objects.Game.keyboardManager.moveLeft){
                this.x -= this.speed;
            }

            if(objects.Game.keyboardManager.moveRight){
                this.x += this.speed;
            }

            if(objects.Game.keyboardManager.moveUp){
                if(this.colliding == true){
                    this.y -= 1;
                    if(this.vSpeed >0){
                        this.vSpeed *= -1;
    
                    }
                }
 
            }

            if(objects.Game.keyboardManager.moveDown){
            }
        }

        public CheckBounds():void {
            /*
            // Check right boundary
            if(this.x >= 600 - this.halfW) {
                this.x = 600 - this.halfW;
            }

            // Check left boundary
            if(this.x <= this.halfW) {
                this.x = this.halfW;
            }
            */
        }
    }
}