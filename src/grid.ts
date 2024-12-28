export const positiveNegativeZero = (x: number, epsilon: number = 0.1) => Math.abs(x) > epsilon ? 0 : x > 0 ? 1 : -1;
export function getGrid(
  f: (x: number, y: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  resolution: number
): number[][] {
  const grid: number[][] = [];

  for (let y = yMin; y <= yMax; y += resolution) {
    const row: number[] = [];
    for (let x = xMin; x <= xMax; x += resolution) {
      // Check if f(x, y) equals 0
      row.push(f(x,y));
    }
    grid.push(row);
  }

  return grid;
}
