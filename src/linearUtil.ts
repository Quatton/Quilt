import { Point, Path, Line } from "./Coord.js";

export function createLineFromPath(path: Path): Line {
    const dy: number = path.pos2.y - path.pos1.y;
    const dx: number = path.pos2.x - path.pos1.x;
    const c: number = path.pos1.y * dx + path.pos1.x * dy;
    return { A: -dy / c, B: dx / c };
}

export function intersectionOfPaths(path1: Path, path2: Path): void {
    const line1 = createLineFromPath(path1);
    const line2 = createLineFromPath(path2);
}
