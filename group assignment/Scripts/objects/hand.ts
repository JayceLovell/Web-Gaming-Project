module objects {
    export class hand extends GameObject {

        constructor( x:number = 0, y:number = 0) {
            super("hand"); 
            this.x=x;
            this.y=y;
        }

        public Start(){}
        public Update(){}
        public Reset(){}
        public Move(){}
        public CheckBounds(){}

    }
}