export function linearTween(elapsed: number, duration: number) {
  return elapsed / duration;
}

export function easeInQuad(elapsed: number, duration: number) {
  const t = elapsed / duration;
  return t * t;
}
