import Engine from "./Engine.js";
import PhysicsObject from "./Object.js";
import { ELEMENT } from "./globalConst.js";

// Value Const
const ASPECT_RATIO: number = 1;

// ELEMENT.SCREEN Settings
ELEMENT.SCREEN.width = 400;
ELEMENT.SCREEN.height = ELEMENT.SCREEN.width * ASPECT_RATIO;

const ctx: CanvasRenderingContext2D = ELEMENT.SCREEN.getContext("2d");

// Create Engine
const engine = new Engine(ELEMENT.SCREEN.width, ELEMENT.SCREEN.height);

//Create Object and World
for (let i = 0; i < 5; i++) engine.addTestObject((i + 1).toString());
engine.createWorld(0.5);

// Loop Start
let lastTime: number = 0;

function animation(timestamp: number) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, ELEMENT.SCREEN.width, ELEMENT.SCREEN.height);

  engine.update(dt);
  engine.draw(ctx);

  requestAnimationFrame(animation);
}

requestAnimationFrame(animation);
