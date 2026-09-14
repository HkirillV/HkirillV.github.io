import styles from './HeroDeck.module.css'

export function DeckDefs() {
  return (
    <defs>
      <linearGradient id="heroDeckBase" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3d065f" />
        <stop offset="100%" stopColor="#5f27bd" />
      </linearGradient>
      <linearGradient id="heroDeckKeyboard" x1="0" y1="1" x2="0.2" y2="0">
        <stop offset="0%" stopColor="#3d065f" />
        <stop offset="100%" stopColor="#10054d" />
      </linearGradient>
      <linearGradient id="heroDeckLid" x1="0" y1="0" x2="0.75" y2="1">
        <stop offset="0%" stopColor="#311b61" />
        <stop offset="55%" stopColor="#200041" />
        <stop offset="100%" stopColor="#0f001f" />
      </linearGradient>
      <linearGradient id="heroDeckScreen" x1="1" y1="1" x2="0.08" y2="0">
        <stop offset="4%" stopColor="#2a0c5c" />
        <stop offset="68%" stopColor="#5f27bd" />
        <stop offset="97%" stopColor="#b4299a" />
      </linearGradient>
      <linearGradient id="heroDeckGlass" x1="0.1" y1="0" x2="0.75" y2="1">
        <stop offset="0%" stopColor="#4974c9" stopOpacity="0.64" />
        <stop offset="50%" stopColor="#6247ca" stopOpacity="0.64" />
        <stop offset="100%" stopColor="#6c23b6" stopOpacity="0.64" />
      </linearGradient>
      <radialGradient id="heroDeckShine">
        <stop offset="0%" stopColor="#ff8ad8" stopOpacity="0.8" />
        <stop offset="35%" stopColor="#e857bd" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#e04bb4" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="heroDeckFloor">
        <stop offset="0%" stopColor="#d64bb0" stopOpacity="0.7" />
        <stop offset="40%" stopColor="#a4308a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#a4308a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="heroDeckBandRight" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" className={styles.bandStop} />
        <stop offset="55%" className={styles.bandDrop} />
        <stop offset="100%" className={styles.bandFade} />
      </linearGradient>
      <linearGradient id="heroDeckBandLeft" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0%" className={styles.bandStop} />
        <stop offset="55%" className={styles.bandDrop} />
        <stop offset="100%" className={styles.bandFade} />
      </linearGradient>
      <linearGradient id="heroDeckHinge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2c1656" />
        <stop offset="55%" stopColor="#170a33" />
        <stop offset="100%" stopColor="#0d0520" />
      </linearGradient>
      <linearGradient id="heroDeckLidShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a0320" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#0a0320" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="heroDeckFade">
        <stop offset="35%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id="heroDeckSoft">
        <rect x="20" y="20" width="660" height="568" fill="url(#heroDeckFade)" />
      </mask>
      <clipPath id="heroDeckRail">
        <rect x="48" y="8" width="152" height="40" />
      </clipPath>
      <marker
        id="heroDeckArrow"
        viewBox="0 0 8 8"
        refX="6.5"
        refY="4"
        markerWidth="4.6"
        markerHeight="4.6"
        orient="auto"
      >
        <path d="M 0 1 L 7 4 L 0 7 z" className={styles.arrowHead} />
      </marker>
    </defs>
  )
}
