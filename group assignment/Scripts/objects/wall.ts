module objects {
    export class wall extends GameObject {

        // Constructor
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,xmin:number,xmax:number, ymin:number,ymax:number) {
            super(assetManager,imageString); 
            this.x=x;
            this.y=y;
        }
        // Methods

        public Update(){
        

        }


    }
}