module objects {
    export class hand extends GameObject {

        // Constructor
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,xmin:number,xmax:number, ymin:number,ymax:number) {
            super(assetManager,imageString); 
        }

        public Update()
        {
            
        }
    }
}