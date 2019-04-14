module objects {
    export class Wall extends objects.GameObject {
        // Variables
        // Constructor
        constructor(x:number = 0, y:number = 0) {
            super("wall");

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