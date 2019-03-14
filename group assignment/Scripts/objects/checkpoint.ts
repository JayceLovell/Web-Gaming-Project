module objects {
    export class checkPoint extends GameObject {

        public index:number;
        constructor(x:number = 0, y:number = 0) {
            super("player"); 
            this.x=x;
            this.y=y;
        }

        public Update()
        {}
    }
}