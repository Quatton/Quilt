export interface Point {
  x: number;
  y: number;
}

export interface Path {
  pos1: Point;
  pos2: Point;
}

export interface Line {
  //Ax + By = 1
  A: number;
  B: number;
}

export const INDEF: string = "INDEF";
