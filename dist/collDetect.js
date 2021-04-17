import { momentumConservObjObj } from "./physicsUtil.js";
function createObjCollisionBox(object) {
    const collisionBox = {
        left: object.p.x,
        top: object.p.y,
        right: object.p.x + object.s.w,
        bottom: object.p.y + object.s.h,
    };
    return collisionBox;
}
export function collDetectObjObj(object1, object2) {
    const coll1 = createObjCollisionBox(object1);
    const coll2 = createObjCollisionBox(object2);
    let collide = false;
    let HOZ = 0, VER = 0;
    // Right
    if (coll2.left < coll1.left && coll1.left < coll2.right) {
        HOZ = coll2.right - coll1.left; // > 0
    }
    // Left
    if (coll1.left < coll2.left && coll2.left < coll1.right) {
        HOZ = coll2.left - coll1.right; // < 0
    }
    // Top
    if (coll1.top < coll2.top && coll2.top < coll1.bottom) {
        VER = coll2.top - coll1.bottom; // < 0
    }
    // Bottom
    if (coll2.top < coll1.top && coll1.top < coll2.bottom) {
        VER = coll2.bottom - coll1.top; // > 0
    }
    if (HOZ == 0 || VER == 0)
        return false;
    collide = true;
    let side = 0; //to calc momentum
    // If we should prefer horizontal than vertical
    if (Math.abs(HOZ) < Math.abs(VER)) {
        side = 2 + Math.sign(HOZ); // 2 + -1 = 1 -> left || 2 + 1 = 3 = right
        if (Math.sign(HOZ) < 0)
            //Left
            object1.p.x = coll2.left - object1.s.w;
        else
            object1.p.x = coll2.right;
    }
    else {
        side = 3 + Math.sign(HOZ);
        if (Math.sign(VER) < 0)
            //TOP
            object1.p.y = coll2.top - object1.s.h;
        else
            object1.p.y = coll2.bottom;
    } // 3 + -1 = 2 -> top || 3 + 1 = 4 = bottom
    momentumConservObjObj(object1, object2, side);
    return collide;
}
export function collDetectObjWorld(object, world) {
    const coll = createObjCollisionBox(object);
    let collide = false;
    if (coll.left < world.left || coll.right > world.right) {
        object.v.x = -object.v.x * world.e;
        if (coll.left < world.left)
            object.p.x = world.left;
        else
            object.p.x = world.right - object.s.w;
        collide = true;
    }
    if (coll.top < world.top || coll.bottom > world.bottom) {
        object.v.y = -object.v.y * world.e;
        if (coll.top < world.top)
            object.p.y = world.top;
        else
            object.p.y = world.bottom - object.s.h;
        collide = true;
    }
    return collide;
}
