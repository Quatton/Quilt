import Engine from "./Engine.js";
import { ELEMENT } from "./globalConst.js";
// Value Const
const ASPECT_RATIO = 1;
// ELEMENT.SCREEN Settings
ELEMENT.SCREEN.width = 600;
ELEMENT.SCREEN.height = ELEMENT.SCREEN.width * ASPECT_RATIO;
const ctx = ELEMENT.SCREEN.getContext("2d");
const engine = new Engine(ELEMENT.SCREEN.width, ELEMENT.SCREEN.height);
// Listen for reset Event
//Create Object and World
for (let i = 0; i < 10; i++)
    engine.addTestObject((i + 1).toString());
engine.createWorld(1000, 0.9, "#DDDDDD");
// Loop Start
let lastTime = 0;
function animation(timestamp) {
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, ELEMENT.SCREEN.width, ELEMENT.SCREEN.height);
    engine.update(dt);
    engine.draw(ctx);
    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);
