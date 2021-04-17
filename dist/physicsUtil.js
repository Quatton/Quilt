import { SIDE } from "./globalConst.js";
export function momentumConservObjObj(o1, o2, side, e = 1) {
    if (e > 1)
        e = 1;
    //const because what the fuck
    const m1 = o1.m;
    const m2 = o2.m;
    const ux1 = o1.v.x;
    const ux2 = o2.v.x;
    const uy1 = o1.v.y;
    const uy2 = o2.v.y;
    const Ei = m1 * Math.pow(o1.v.x, 2) + m2 * Math.pow(o2.v.x, 2) + m1 * Math.pow(o1.v.y, 2) + m2 * Math.pow(o2.v.y, 2);
    let vx1;
    if (side === SIDE.LEFT || side === SIDE.RIGHT) {
        o1.v.x = ((m1 - m2) * ux1 + 2 * m2 * ux2) / (m1 + m2);
        o2.v.x = ((m2 - m1) * ux2 + 2 * m1 * ux1) / (m1 + m2);
    }
    else if (side === SIDE.TOP || side === SIDE.BOTTOM) {
        o1.v.y = ((m1 - m2) * ux1 + 2 * m2 * uy2) / (m1 + m2);
        o2.v.y = ((m2 - m1) * ux2 + 2 * m1 * uy1) / (m1 + m2);
    }
    const Ef = m1 * Math.pow(o1.v.x, 2) + m2 * Math.pow(o2.v.x, 2) + m1 * Math.pow(o1.v.y, 2) + m2 * Math.pow(o2.v.y, 2);
    return;
}
export function momentumConservObjWorld(obj, world, side, e = 1) {
    if (!obj.bouncing || side === SIDE.NONE)
        return;
    if (e > 1 || e < 0)
        e = 1;
    if (side === SIDE.TOP || side === SIDE.BOTTOM) {
        if (side === SIDE.TOP)
            obj.p.y = 0;
        else
            obj.p.y = world.bottom - obj.s.h;
        obj.v.y = -obj.v.y * e;
        return;
    }
    if (side === SIDE.RIGHT || side === SIDE.LEFT) {
        if (side === SIDE.LEFT)
            obj.p.x = 0;
        else
            obj.p.x = world.right - obj.s.w;
        obj.bouncing = true;
        obj.v.x = -obj.v.x * e;
        return;
    }
}
