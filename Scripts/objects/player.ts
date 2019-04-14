module objects {
    export class Player extends objects.GameObject {
        // Variables
        public colliding:boolean;
        public speed:number;
        public vSpeed:number;
        public previousX;
        public previousY;
        // Constructor
        constructor(x:number = 0, y:number = 0) {
            super( "player");
            this.Start();
            this.x = x;
            this.y = y;
        }
        // Methods / functions
        public Start():void {
            this.colliding = false;
            this.speed = 5;
            this.vSpeed = 0.5;
            this.previousX=this.x;
            this.previousY=this.y;
        }

        public Update():void {
            if(this.colliding == false){
                this.previousX=this.x;
                this.previousY=this.y;
            }

            this.Move();
            this.CheckBounds();

            if(this.vSpeed < 10 ){
                this.vSpeed +=0.2;
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
                //this.y -= 3;
                if(this.colliding == true){
                    
                    if(this.vSpeed >0){
                        this.vSpeed = -9;
    
                    }
                }
 
            }

            if(objects.Game.keyboardManager.moveDown){
                //this.y += 3;
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