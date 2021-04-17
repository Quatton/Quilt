export function createLineFromPath(path) {
    const dy = path.pos2.y - path.pos1.y;
    const dx = path.pos2.x - path.pos1.x;
    const c = path.pos1.y * dx + path.pos1.x * dy;
    return { A: -dy / c, B: dx / c };
}
export function intersectionOfPaths(path1, path2) {
    const line1 = createLineFromPath(path1);
    const line2 = createLineFromPath(path2);
}
