export function randBetween(min: number, max: number) {
  return Math.floor((max - min) * Math.random()) + min;
}

export function randFloatBetween(min: number, max: number) {
  return (max - min) * Math.random() + min;
}

export function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
