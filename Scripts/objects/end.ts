module objects {
    export class End extends GameObject {

        public index:number;
        constructor(x:number = 0, y:number = 0) {
            super("portal"); 
            this.x=x;
            this.y=y;
        }

        public Update()
        {}
    }
}