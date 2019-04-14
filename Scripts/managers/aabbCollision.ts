 module managers {
    export class AABBCollisions {
        private static explodeSFX:createjs.AbstractSoundInstance
        public static top: boolean;
        public static bot: boolean;

        public static left: boolean;

        public static right: boolean;

        public static wSide: number;

        public static checKSides(obj1: objects.GameObject, obj2: objects.GameObject):number{
            let leftPointObj1 = obj1.x -obj1.halfW;
            let rightPointObj1 = obj1.x+ obj1.halfW;

            let leftPointObj2 = obj2.x-obj2.halfW;
            let rightPointObj2 = obj2.x + obj2.halfW;

            let upPointObj1 = obj1.y -obj1.halfH;
            let downPointObj1 = obj1.y+ obj1.halfH;

            let upPointObj2 = obj2.y-obj2.halfH;
            let downPointObj2 = obj2.y + obj2.halfH;
           
            //a.b = Amagx * Bmagx + Amagy *Bmagy

            //magx = x1 -x2
            //magy =y1-y2;

            let  aMagX = obj1.x - obj2.x;
            let bMagX = obj2.x - obj2.x;

            let  aMagY = obj1.y - obj2.y;
            let bMagY = obj2.y - (obj2.y - 1);

            let dot = (aMagX*bMagX) + (aMagY *bMagY);

            if (dot  <= -25){
                this.wSide = 1;
            }else if (dot >= 25){
                this.wSide = 2;
            }else if (dot  <=29 && dot >= -29 && obj1.x < obj2.x){
                this.wSide = 4;
            }else if (dot  <=29 && dot >= -29 && obj1.x > obj2.x){
                this.wSide = 3;

            }


   

            if(downPointObj1 >= upPointObj2 && downPointObj1 <= downPointObj2){

                // console.log("up");
                // this.wSide = 1;
            }
            if(upPointObj1 <= downPointObj2 && upPointObj1 >= upPointObj2){
                // console.log("down");

                // this.wSide = 2;

            }

            if(leftPointObj1 <= rightPointObj2 && leftPointObj1 >= leftPointObj2){
                // console.log("right");

                // this.wSide = 3;

            }
            if(rightPointObj1 >= leftPointObj2 && rightPointObj1 <= rightPointObj2){
                // console.log("left");

                // this.wSide = 4;

            }
            return this.wSide;
        }


        public static Check(obj1: objects.GameObject, obj2: objects.GameObject):boolean {


            let leftPointObj1 = obj1.x -obj1.halfW;
            let rightPointObj1 = obj1.x+ obj1.halfW;

            let leftPointObj2 = obj2.x-obj2.halfW;
            let rightPointObj2 = obj2.x + obj2.halfW;

            let upPointObj1 = obj1.y -obj1.halfH;
            let downPointObj1 = obj1.y+ obj1.halfH;

            let upPointObj2 = obj2.y-obj2.halfH;
            let downPointObj2 = obj2.y + obj2.halfH;


            if(((leftPointObj1 <= rightPointObj2 && leftPointObj1>= leftPointObj2) || (rightPointObj1 >= leftPointObj2 && rightPointObj1 <= rightPointObj2))&&((upPointObj1<=downPointObj2&&upPointObj1>=upPointObj2)||(downPointObj1>=upPointObj2 && downPointObj1<=downPointObj2))){
                return true;

            }else {
                return false;

            }
            // if(obj1.x < obj2.x + obj2.width &&
            //     obj1.x + obj1.width > obj2.x &&
            //     obj1.y < obj2.y + obj2.height &&
            //     obj1.y + obj1.height > obj2.y){
            //         return true;
            //     }else {
            //         return false; 
            //     }
            



        }


    }
}