import Engine from "./Engine.js";
import { ENGINESTATE } from "./globalConst.js";

export default class InputHandler {
  constructor(engine: Engine) {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 32:
          if (engine.state === ENGINESTATE.TOSTART) engine.start();
          else engine.togglePause();
          break;
        default:
          break;
      }
    });
  }
}
