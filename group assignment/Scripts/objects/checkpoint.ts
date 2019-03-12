module objects {
    export class checkPoint extends GameObject {

        public index:number;
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,xmin:number,xmax:number, ymin:number,ymax:number) {
            super(assetManager,imageString); 
        }

        public Update()
        {}
    }
}