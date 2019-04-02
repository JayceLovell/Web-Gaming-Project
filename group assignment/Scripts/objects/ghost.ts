module objects {
    export class Ghost extends GameObject {
        // Variables
        private forward: boolean =true;
        public isPlayerClose:boolean = false;
        public speed:number;
        public vSpeed:number;
        public xmin:number;
        public xmax:number;
        // Constructor
        constructor(x:number = 0, y:number = 0,tileSize:number=48) {
            super("ghost"); 
            this.xmin= x - (2 * tileSize);
            this.xmax= x + (2 * tileSize);
            this.x=x;
            this.y=y;
            this.speed = 2;

        }
        public Start(){}

        public Update()
        {
            if(this.x <= this.xmin){
                this.speed = 2;
            }else if(this.x >= this.xmax){
                this.speed = -2;
            }
            this.x += this.speed;

        }
        public Reset(){}
        public Move(){}
        public CheckBounds(){}


    }
}