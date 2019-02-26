var managers;
(function (managers) {
    var AABBCollisions = /** @class */ (function () {
        function AABBCollisions() {
        }
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
        };
        return AABBCollisions;
    }());
    managers.AABBCollisions = AABBCollisions;
})(managers || (managers = {}));
//# sourceMappingURL=aabbCollision.js.map