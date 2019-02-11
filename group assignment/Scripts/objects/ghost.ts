module objects {
    export class ghost extends GameObject {
        // Variables
        private forward: boolean =true;
        private xmin:number;
        private xmax:number;
        private ymin:number;
        private ymax:number;
        // Constructor
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,xmin:number,xmax:number, ymin:number,ymax:number) {
            super(assetManager,imageString); 
            this.xmin=xmin;
            this.xmax=xmax;
            this.ymin=ymin;
            this.ymax=ymax;
            this.x=x;
            this.y=y;
        }
        // Methods

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


    }
}