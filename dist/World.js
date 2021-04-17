export default class World {
    constructor(screenWidth, screenHeight, e = 1, fill = "#FFF") {
        this.left = 0;
        this.top = 0;
        this.right = screenWidth;
        this.bottom = screenHeight;
        this.fill = fill;
        this.e = e;
        if (e > 1 || e < 0)
            this.e = 1;
    }
}
