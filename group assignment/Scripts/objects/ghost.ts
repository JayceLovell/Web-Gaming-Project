module objects {
    export class ghost extends Image {
        // Variables
        private forward: boolean =true;
        private xmin:number;
        private xmax:number;
        private ymin:number;
        private ymax:number;
        private speed:number;
        // Constructor
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,xmin:number,xmax:number, ymin:number,ymax:number,speed:number) {
            // super(imageString);
            super(assetManager,imageString,x,y);   // Actual loaded object is of type BLOB  
            this.xmin=xmin;
            this.xmax=xmax;
            this.ymin=ymin;
            this.ymax=ymax;
            this.speed=sped;
        }
        // Methods

        public move(newX : number)
        {
            if(forward){

            }else{

            }
            if(this.getX())
        }


    }
}