 module managers {
    export class AABBCollisions {
        private static explodeSFX:createjs.AbstractSoundInstance

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



        }


    }
}