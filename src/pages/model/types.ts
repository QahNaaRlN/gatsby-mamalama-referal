export interface HomePageData {
  allStrapiService: {
    nodes: Array<{
      id: string
      title: string
      description: string
      price: number
      discount?: number
    }>
  }
}