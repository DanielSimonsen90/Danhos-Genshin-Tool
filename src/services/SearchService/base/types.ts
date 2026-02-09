export type ScoreColorProps = {
  scores: [
    min: number,
    current: number,
    max: number,
  ],
  colors: [
    low: string,
    high: string,
  ]
}