module objects {
    export class Ghost extends GameObject {
        // Variables
        private forward: boolean =true;
        public isPlayerClose:boolean = false;
        public speed:number;
        public vSpeed:number;
        private xmin:number;
        private xmax:number;
        private ymin:number;
        private ymax:number;
        // Constructor
        constructor(x:number = 0, y:number = 0,tileSize:number=48) {
            super("ghost"); 
            this.xmin= x - (2 * tileSize);
            this.xmax= x + (2 * tileSize);
            this.ymin=y;
            this.ymax=y;
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