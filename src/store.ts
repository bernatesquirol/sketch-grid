import { proxy } from 'valtio'

export const store = proxy({
  cellSize: 20,
  strokeWeight: 4,
  lowerColor: '#ff6b56',
  upperColor: '#5656ff',
  horizontalChance: 0.5,
  backgroundColor: '#ffffff',
  exponentBase: 2.718,
  exponentScale: 0.005,
  gapSize: 15,
  invertPattern: false,
  debug: false
}) 