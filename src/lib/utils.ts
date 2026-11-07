import * as THREE from "three";

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function lerpV3(
  start: THREE.Vector3,
  end: THREE.Vector3,
  t: number,
  out: THREE.Vector3
): THREE.Vector3 {
  out.x = lerp(start.x, end.x, t);
  out.y = lerp(start.y, end.y, t);
  out.z = lerp(start.z, end.z, t);
  return out;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
