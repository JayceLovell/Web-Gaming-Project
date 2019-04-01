module objects {
    export class checkPoint extends GameObject {

        public index:number;
        constructor(x:number = 0, y:number = 0,tileSize:number=48) {
            super("savePoint"); 
            this.x=x;
            this.y=y;

            if(this.x<=20*tileSize&&this.y<17*tileSize)
                this.index=1;
            else if(this.x<=20*tileSize)
                this.index=2;
            else if(this.x>20*tileSize)
                this.index=3;
            else
                this.index=4;
        }

        public Update()
        {}
    }
}