export interface IRubricItem {
  id: number
  title: string
  url: string
  children?: IRubricItem[]
  count: number
}
