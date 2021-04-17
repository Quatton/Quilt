import PhysicsObject from "./Object.js";
import World from "./World.js";
import { SIDE } from "./globalConst.js";
import { ELEMENT } from "./globalConst.js";
import { collDetectObjObj, collDetectObjWorld } from "./collDetect.js";
import {
  momentumConservObjObj,
  momentumConservObjWorld,
} from "./physicsUtil.js";
import { combo } from "./util.js";
import { ENGINESTATE } from "./globalConst.js";
import InputHandler from "./input.js";

export default class Engine {
  screenWidth: number;
  screenHeight: number;
  objects: Array<PhysicsObject>;
  world: World;
  state: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.objects = [];
    this.world = new World(this.screenWidth, this.screenHeight, 100, 1, "#FFF");
    this.state = ENGINESTATE.TOSTART;

    new InputHandler(this);
  }

  createWorld(g: number = 1000, e: number = 1, c: string = "#FFF") {
    this.world = new World(this.screenWidth, this.screenHeight, g, e, c);
  }

  addTestObject(name: string) {
    const n = name;
    const w = 40 + Math.random() * 30;
    const color = `#${100000 + Math.floor(Math.random() * 900000)}`;

    let collision = true;
    setTimeout(() => {
      collision = false;
    }, 100);

    while (collision) {
      const testSquare = new PhysicsObject(
        n,
        {
          x: Math.random() * (ELEMENT.SCREEN.width - w),
          y: Math.random() * (ELEMENT.SCREEN.height - w),
        },
        { x: w + Math.random() * 10, y: w * Math.random() * 10 },
        { x: 0, y: 0 },
        { w: w, h: w, color: color },
        10
      );

      collision = false;

      this.objects.forEach((object) => {
        collision = collision || collDetectObjObj(object, testSquare);
      });

      this.objects.forEach((object) => {
        collision = collision || collDetectObjWorld(object, this.world);
      });

      if (!collision) {
        this.addObject(testSquare);
        break;
      }

      collision = true;
    }
  }

  addObject(object: PhysicsObject) {
    this.objects.push(object);
  }

  start() {
    if (this.state === ENGINESTATE.TOSTART) this.state = ENGINESTATE.RUNNING;

    //Add Gravity
    this.objects.forEach((object) => {
      object.a.y += this.world.g;
    });
  }

  togglePause() {
    if (this.state === ENGINESTATE.RUNNING) this.state = ENGINESTATE.PAUSED;
    else if (this.state === ENGINESTATE.PAUSED)
      this.state = ENGINESTATE.RUNNING;
  }

  update(dt: number) {
    if (this.state === ENGINESTATE.RUNNING) {
      combo(this.objects).forEach((arr) => {
        const [object1, object2] = arr;
        collDetectObjObj(object1, object2);
      });

      this.objects.forEach((object) => {
        collDetectObjWorld(object, this.world);
      });

      this.objects.forEach((object) => object.update(dt));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw BG
    ctx.fillStyle = this.world.fill;
    console.log(this.world.fill);
    ctx.rect(0, 0, ELEMENT.SCREEN.width, ELEMENT.SCREEN.height);
    ctx.fill();

    // Draw Object
    this.objects.forEach((object) => object.draw(ctx));

    // Draw Paused Screen Overlay
    if (this.state !== ENGINESTATE.RUNNING) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.rect(0, 0, ELEMENT.SCREEN.width, ELEMENT.SCREEN.height);
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR To Start",
        this.screenWidth / 2,
        this.screenHeight / 2
      );
    }
  }
}
