module objects {
    export class Wall extends objects.GameObject {
        // Variables
        // Constructor
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0) {
            super(assetManager,imageString);
            //super(assetManager.getResult(imageString));   // Actual loaded object is of type BLOB

            // Because image is now guarenteed to be loaded we can do the following...
            // Asset manager also returns a button object when getResult is called. 
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.x = x;
            this.y = y;
        }
        // Methods

        public setX(newX : number)
        {
            this.x = newX;
        }

        public getX(): number
        {
            return this.x;
        }

    }
}