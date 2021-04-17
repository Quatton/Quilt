export default class World {
  left: number;
  top: number;
  right: number;
  bottom: number;
  e: number;
  g: number;

  constructor(screenWidth: number, screenHeight: number, e: number = 1) {
    this.left = 0;
    this.top = 0;
    this.right = screenWidth;
    this.bottom = screenHeight;
    this.e = e;
    if (e > 1 || e < 0) this.e = 1;
  }
}
