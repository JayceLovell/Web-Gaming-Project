var managers;
(function (managers) {
    var AABBCollisions = /** @class */ (function () {
        function AABBCollisions() {
        }
        AABBCollisions.checKSides = function (obj1, obj2) {
            var leftPointObj1 = obj1.x - obj1.halfW;
            var rightPointObj1 = obj1.x + obj1.halfW;
            var leftPointObj2 = obj2.x - obj2.halfW;
            var rightPointObj2 = obj2.x + obj2.halfW;
            var upPointObj1 = obj1.y - obj1.halfH;
            var downPointObj1 = obj1.y + obj1.halfH;
            var upPointObj2 = obj2.y - obj2.halfH;
            var downPointObj2 = obj2.y + obj2.halfH;
            //a.b = Amagx * Bmagx + Amagy *Bmagy
            //magx = x1 -x2
            //magy =y1-y2;
            var aMagX = obj1.x - obj2.x;
            var bMagX = obj2.x - obj2.x;
            var aMagY = obj1.y - obj2.y;
            var bMagY = obj2.y - (obj2.y - 1);
            var dot = (aMagX * bMagX) + (aMagY * bMagY);
            console.log(dot);
            if (dot <= -25) {
                console.log("up");
                this.wSide = 1;
            }
            else if (dot >= 25) {
                console.log("down");
                this.wSide = 2;
            }
            else if (dot <= 29 && dot >= -29 && obj1.x < obj2.x) {
                console.log("left");
                this.wSide = 4;
            }
            else if (dot <= 29 && dot >= -29 && obj1.x > obj2.x) {
                console.log("right");
                this.wSide = 3;
            }
            if (downPointObj1 >= upPointObj2 && downPointObj1 <= downPointObj2) {
                // console.log("up");
                // this.wSide = 1;
            }
            if (upPointObj1 <= downPointObj2 && upPointObj1 >= upPointObj2) {
                // console.log("down");
                // this.wSide = 2;
            }
            if (leftPointObj1 <= rightPointObj2 && leftPointObj1 >= leftPointObj2) {
                // console.log("right");
                // this.wSide = 3;
            }
            if (rightPointObj1 >= leftPointObj2 && rightPointObj1 <= rightPointObj2) {
                // console.log("left");
                // this.wSide = 4;
            }
            return this.wSide;
        };
        AABBCollisions.Check = function (obj1, obj2) {
            var leftPointObj1 = obj1.x - obj1.halfW;
            var rightPointObj1 = obj1.x + obj1.halfW;
            var leftPointObj2 = obj2.x - obj2.halfW;
            var rightPointObj2 = obj2.x + obj2.halfW;
            var upPointObj1 = obj1.y - obj1.halfH;
            var downPointObj1 = obj1.y + obj1.halfH;
            var upPointObj2 = obj2.y - obj2.halfH;
            var downPointObj2 = obj2.y + obj2.halfH;
            if (((leftPointObj1 <= rightPointObj2 && leftPointObj1 >= leftPointObj2) || (rightPointObj1 >= leftPointObj2 && rightPointObj1 <= rightPointObj2)) && ((upPointObj1 <= downPointObj2 && upPointObj1 >= upPointObj2) || (downPointObj1 >= upPointObj2 && downPointObj1 <= downPointObj2))) {
                return true;
            }
            else {
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
        };
        return AABBCollisions;
    }());
    managers.AABBCollisions = AABBCollisions;
})(managers || (managers = {}));
//# sourceMappingURL=aabbCollision.js.map