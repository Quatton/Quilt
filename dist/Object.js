import { ELEMENT } from "./globalConst.js";
export default class PhysicsObject {
    constructor(name, position = { x: 0, y: 0 }, velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, shape = { w: 10, h: 10, color: "#000" }, mass = 10) {
        this.name = name;
        this.p = position;
        this.v = velocity;
        this.a = acceleration;
        this.s = shape;
        this.m = mass;
        // if (true) {
        //     //Check if Rectangle but idk how
        //     this.c = {
        //         tl: { x: this.p.x, y: this.p.y },
        //         tr: { x: this.p.x + this.s.w, y: this.p.y },
        //         bl: { x: this.p.x, y: this.p.y + this.s.h },
        //         br: { x: this.p.x + this.s.w, y: this.p.y + this.s.h },
        //     };
        // }
    }
    clone() {
        return new PhysicsObject(this.name, { ...this.p }, { ...this.v }, { ...this.a }, { ...this.s }, this.m);
    }
    update(dt) {
        dt /= 1000;
        this.p.x += this.v.x * dt;
        this.p.y += this.v.y * dt;
        this.v.x += this.a.x * dt;
        this.v.y += this.a.y * dt;
    }
    draw(ctx) {
        if (this.p.x + this.s.w < 0 ||
            this.p.x > ELEMENT.SCREEN.width ||
            this.p.y + this.s.h < 0 ||
            this.p.y > ELEMENT.SCREEN.height)
            return;
        ctx.fillStyle = this.s.color;
        ctx.fillRect(this.p.x, this.p.y, this.s.w, this.s.h);
        ctx.font = `${this.s.w}px Arial`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.name, this.p.x + this.s.w / 2, this.p.y + this.s.h / 1.2);
    }
}
