export const VIEW_BOX = '18 -10 674 580'

export const DECK_MATRIX = 'matrix(0.869333 0.50191 -0.955553 0.551689 0 0)'
export const LID_MATRIX = 'matrix(0.869333 0.50191 0 1.22077 0 0)'

export interface Box {
  readonly cx: number
  readonly cy: number
  readonly w: number
  readonly h: number
}

export const BOX = {
  deck: { cx: 278.4, cy: 402.3, w: 311, h: 177 },
  deckPlate: { cx: 278.4, cy: 423.9, w: 311, h: 177 },
  keyboard: { cx: 306.4, cy: 385.8, w: 235, h: 78 },
  lid: { cx: 364.8, cy: 243.9, w: 296, h: 183 },
  screen: { cx: 363.3, cy: 243.9, w: 272, h: 164 },
  glass: { cx: 214, cy: 246.9, w: 152, h: 158 },
  bytes: { cx: 441.6, cy: 288.2, w: 59, h: 136 },
  rail: { cx: 442, cy: 352, w: 248, h: 56 },
  shine: { cx: 246, cy: 93, w: 192, h: 186 },
  rhombus: { cx: 318, cy: 158.1, w: 74, h: 44 },
} as const satisfies Record<string, Box>

export function place(box: Box, matrix: string): string {
  return `translate(${box.cx} ${box.cy}) ${matrix} translate(${-box.w / 2} ${-box.h / 2})`
}

const SCENE_CENTRE = 300
const DRIFT_DISTANCE = 34

export function drift({ cx, cy }: Pick<Box, 'cx' | 'cy'>): readonly [number, number] {
  const dx = cx - SCENE_CENTRE
  const dy = cy - SCENE_CENTRE
  const length = Math.hypot(dx, dy) || 1

  return [
    Math.round((dx / length) * DRIFT_DISTANCE),
    Math.round((dy / length) * DRIFT_DISTANCE),
  ] as const
}
