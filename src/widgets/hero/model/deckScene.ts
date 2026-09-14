import { drift, type Box } from './deckGeometry'

const KEY_GAP = 4
const KEY_START_X = 9
const KEY_UNIT = 12.9

const KEY_ROWS = [
  { y: 9, height: 5, widths: Array.from({ length: 13 }, () => KEY_UNIT) },
  { y: 18, height: 10, widths: Array.from({ length: 13 }, () => KEY_UNIT) },
  { y: 32, height: 10, widths: Array.from({ length: 13 }, () => KEY_UNIT) },
  { y: 46, height: 10, widths: [...Array.from({ length: 11 }, () => KEY_UNIT), 29] },
  {
    y: 59,
    height: 10,
    widths: [KEY_UNIT, KEY_UNIT, KEY_UNIT, 78, KEY_UNIT, KEY_UNIT, KEY_UNIT, KEY_UNIT, KEY_UNIT],
  },
]

const WAKE_STAGGER = 9

function wakeDelay(row: number, column: number): number {
  return (
    Math.round(Math.abs(Math.sin((row * 17 + column + 1) * 12.9898) * 43758.5453)) % WAKE_STAGGER
  )
}

export interface DeckKey {
  readonly id: string
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly delay: number
}

export const KEYS: readonly DeckKey[] = KEY_ROWS.flatMap((row, rowIndex) => {
  let x = KEY_START_X

  return row.widths.map((width, column) => {
    const key = {
      id: `${rowIndex}-${column}`,
      x,
      y: row.y,
      width,
      height: row.height,
      delay: wakeDelay(rowIndex, column),
    }

    x += width + KEY_GAP

    return key
  })
})

export const ICON_PATHS = {
  gear: 'M 0 -8 L 2.2 -7.4 L 3.8 -9 L 5.9 -6.9 L 4.3 -5.3 L 4.8 -3.2 L 7.1 -2.6 L 7.1 0.4 L 4.8 0.9 L 4.3 3 L 5.9 4.6 L 3.8 6.7 L 2.2 5.1 L 0 5.7 L -0.5 8 L -3.5 8 L -4.1 5.7 L -6.2 5.1 L -7.8 6.7 L -9.9 4.6 L -8.3 3 L -8.9 0.9 L -11.2 0.4 L -11.2 -2.6 L -8.9 -3.2 L -8.3 -5.3 L -9.9 -6.9 L -7.8 -9 L -6.2 -7.4 L -4.1 -8 L -3.5 -10.3 L -0.5 -10.3 Z',
  search: 'M -2 -9 A 7 7 0 1 0 -2 5 A 7 7 0 1 0 -2 -9 M 3.4 3.4 L 9.6 9.6',
  bulb: 'M 0 -9 A 7 7 0 0 1 4.4 3.5 L 4.4 6.2 L -4.4 6.2 L -4.4 3.5 A 7 7 0 0 1 0 -9 M -3.5 8.8 L 3.5 8.8',
  shield: 'M 0 -9.6 L 8.8 -6.1 L 8.8 1.8 A 12 12 0 0 1 0 10.5 A 12 12 0 0 1 -8.8 1.8 L -8.8 -6.1 Z',
} as const

export type IconName = keyof typeof ICON_PATHS

type SignContent =
  | { readonly kind: 'text'; readonly text: string; readonly size: number }
  | { readonly kind: 'icon'; readonly icon: IconName }

interface SignSource extends Box {
  readonly key: string
  readonly side: 'left' | 'right'
  readonly step: number
  readonly band: boolean
  readonly content: SignContent
}

export interface Sign extends SignSource {
  readonly dx: number
  readonly dy: number
}

function text(value: string, size: number): SignContent {
  return { kind: 'text', text: value, size }
}

function icon(name: IconName): SignContent {
  return { kind: 'icon', icon: name }
}

const SIGN_SOURCES: readonly SignSource[] = [
  {
    key: 'code',
    cx: 208,
    cy: 82.2,
    w: 56,
    h: 36,
    side: 'left',
    step: 0,
    band: true,
    content: text('<\\>', 32),
  },
  {
    key: 'stars',
    cx: 184.1,
    cy: 123,
    w: 92,
    h: 36,
    side: 'left',
    step: 1,
    band: false,
    content: text('******', 28),
  },
  {
    key: 'brace',
    cx: 136.6,
    cy: 155.9,
    w: 164,
    h: 35,
    side: 'left',
    step: 2,
    band: false,
    content: text('{ ▶▶▶', 30),
  },
  {
    key: 'gear',
    cx: 127.6,
    cy: 223.6,
    w: 32,
    h: 26,
    side: 'left',
    step: 3,
    band: true,
    content: icon('gear'),
  },
  {
    key: 'ts',
    cx: 72,
    cy: 246,
    w: 48,
    h: 36,
    side: 'left',
    step: 4,
    band: true,
    content: text('TS', 33),
  },
  {
    key: 'search',
    cx: 111,
    cy: 306,
    w: 30,
    h: 24,
    side: 'left',
    step: 5,
    band: true,
    content: icon('search'),
  },
  {
    key: 'react',
    cx: 434.8,
    cy: 138.6,
    w: 93,
    h: 36,
    side: 'right',
    step: 6,
    band: true,
    content: text('React', 33),
  },
  {
    key: 'bulb',
    cx: 549,
    cy: 222,
    w: 42,
    h: 36,
    side: 'right',
    step: 7,
    band: true,
    content: icon('bulb'),
  },
  {
    key: 'shield',
    cx: 522.6,
    cy: 265.8,
    w: 42,
    h: 36,
    side: 'right',
    step: 8,
    band: true,
    content: icon('shield'),
  },
  {
    key: 'postcss',
    cx: 594.3,
    cy: 348,
    w: 133,
    h: 36,
    side: 'right',
    step: 9,
    band: true,
    content: text('PostCSS', 33),
  },
  {
    key: 'js',
    cx: 516.8,
    cy: 459,
    w: 50,
    h: 36,
    side: 'left',
    step: 10,
    band: true,
    content: text('JS', 33),
  },
]

export const SIGNS: readonly Sign[] = SIGN_SOURCES.map((sign) => {
  const [dx, dy] = drift(sign)

  return { ...sign, dx, dy }
})

export const BAND_SCALE = 1.9

interface FlowShape extends Box {
  readonly key: string
  readonly step: number
}

export const FLOW_BLOCKS: readonly (FlowShape & { readonly round: boolean })[] = [
  { key: 'top', cx: 319.2, cy: 99, w: 79, h: 19, round: true, step: 0 },
  { key: 'left', cx: 260.4, cy: 169.2, w: 74, h: 28, round: false, step: 2 },
  { key: 'right', cx: 371.4, cy: 233.4, w: 74, h: 28, round: false, step: 3 },
  { key: 'bottom', cx: 315.6, cy: 264.6, w: 79, h: 19, round: true, step: 4 },
]

export const FLOW_LINES: readonly FlowShape[] = [
  { key: 'topLeft', cx: 274.2, cy: 132.9, w: 24, h: 2, step: 2 },
  { key: 'topRight', cx: 362.4, cy: 183.9, w: 28, h: 2, step: 3 },
  { key: 'bottom', cx: 314.4, cy: 230.4, w: 126, h: 2, step: 4 },
  { key: 'bottomLeft', cx: 259.5, cy: 193.2, w: 2, h: 11, step: 4 },
  { key: 'bottomRight', cx: 369.9, cy: 256.8, w: 2, h: 11, step: 4 },
]

export const FLOW_ARROWS: readonly FlowShape[] = [
  { key: 'top', cx: 318.3, cy: 116.7, w: 2, h: 8, step: 1 },
  { key: 'left', cx: 263.7, cy: 135, w: 2, h: 14, step: 2 },
  { key: 'right', cx: 374.1, cy: 198.6, w: 2, h: 14, step: 3 },
  { key: 'bottom', cx: 317.7, cy: 239.7, w: 2, h: 10, step: 4 },
]

export const RHOMBUS_STEP = 1

type BarTone = 'warm' | 'cool' | 'pink' | 'ink'

interface CodeBar {
  readonly x: number
  readonly w: number
  readonly tone: BarTone
}

export interface CodeRow {
  readonly y: number
  readonly step: number
  readonly bars: readonly CodeBar[]
}

export const CODE_BAR_HEIGHT = 4

const CODE_ROW_SOURCES: readonly Omit<CodeRow, 'step'>[] = [
  {
    y: 22,
    bars: [
      { x: 14, w: 30, tone: 'warm' },
      { x: 48, w: 46, tone: 'cool' },
    ],
  },
  { y: 33, bars: [{ x: 20, w: 58, tone: 'ink' }] },
  {
    y: 44,
    bars: [
      { x: 20, w: 22, tone: 'pink' },
      { x: 46, w: 40, tone: 'cool' },
    ],
  },
  {
    y: 55,
    bars: [
      { x: 28, w: 18, tone: 'ink' },
      { x: 50, w: 32, tone: 'warm' },
    ],
  },
  { y: 66, bars: [{ x: 28, w: 46, tone: 'cool' }] },
  {
    y: 77,
    bars: [
      { x: 20, w: 34, tone: 'pink' },
      { x: 58, w: 20, tone: 'ink' },
    ],
  },
  { y: 88, bars: [{ x: 20, w: 26, tone: 'warm' }] },
  {
    y: 99,
    bars: [
      { x: 28, w: 40, tone: 'cool' },
      { x: 72, w: 16, tone: 'ink' },
    ],
  },
  { y: 110, bars: [{ x: 20, w: 24, tone: 'pink' }] },
  {
    y: 121,
    bars: [
      { x: 14, w: 34, tone: 'warm' },
      { x: 52, w: 28, tone: 'cool' },
    ],
  },
]

export const CODE_ROWS: readonly CodeRow[] = CODE_ROW_SOURCES.map((row, index) => ({
  ...row,
  step: index,
}))

const BIT_ROW_HEIGHT = 19
const BIT_FIRST_Y = 14

export const BITS = ['11010', '00110', '01110', '01011', '10110', '01101', '11001'].map(
  (text, index) => ({ text, y: BIT_FIRST_Y + index * BIT_ROW_HEIGHT, step: index }),
)

export type MarkId = 'react' | 'ts' | 'js' | 'css' | 'html' | 'webpack' | 'vite'

export const RAIL = {
  items: [
    'react',
    'ts',
    'js',
    'css',
    'html',
    'webpack',
    'vite',
  ] as const satisfies readonly MarkId[],
  step: 38,
  firstX: 67,
  dwell: 2800,
  lead: 2,
  span: 8,
} as const

export function railWindow(slot: number): readonly { at: number; mark: MarkId }[] {
  const { items, span, lead } = RAIL

  return Array.from({ length: span }, (_, index) => {
    const at = slot - lead + index
    const pick = ((at % items.length) + items.length) % items.length

    return { at, mark: items[pick] ?? 'react' }
  })
}
