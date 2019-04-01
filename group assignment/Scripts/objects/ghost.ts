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
            super("player"); 
            this.xmin=x-5*tileSize;
            this.xmax=x;
            this.ymin=y;
            this.ymax=y;
            this.x=x;
            this.y=y;
        }
        public Start(){}

        public Update()
        {
            if(this.forward){
                this.speedX = Math.abs(this.xmax-this.x);
                this.speedY = Math.abs(this.ymax-this.y);
                if(Math.abs(this.xmax-this.x)<1&&Math.abs(this.ymax-this.y)<1)
                    this.forward=false;
            }else{
                this.speedX = Math.abs(this.xmin-this.x);
                this.speedY = Math.abs(this.ymin-this.y);
                if(Math.abs(this.xmin-this.x)<1&&Math.abs(this.ymin-this.y)<1)
                    this.forward=true;
            }

        }
        public Reset(){}
        public Move(){}
        public CheckBounds(){}


    }
}