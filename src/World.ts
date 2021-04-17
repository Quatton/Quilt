export default class World {
  left: number;
  top: number;
  right: number;
  bottom: number;
  e: number;
  g: number;
  fill: string;

  constructor(
    screenWidth: number,
    screenHeight: number,
    g: number,
    e: number,
    fill: string
  ) {
    this.left = 0;
    this.top = 0;
    this.right = screenWidth;
    this.bottom = screenHeight;
    this.g = g;
    this.fill = fill;
    this.e = e;
    if (e > 1 || e < 0) this.e = 1;
  }
}
