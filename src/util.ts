import PhysicsObject from "./Object.js";

export function combo(arr: Array<PhysicsObject>): Array<Array<PhysicsObject>> {
  const res = [];
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++) res.push([arr[i], arr[j]]);

  return res;
}

export function clone(obj: any): any {
  if (typeof obj !== "object") return obj;
  if (obj instanceof Object) {
    let copy = {};
    for (const [key, value] of Object.entries(obj)) {
      copy = Object.assign(copy, { [key]: clone(value) });
    }
    return copy;
  }
}
