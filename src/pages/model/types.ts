export interface BaseEntityResponse<T> {
    data: Array<{
      id: string
      attributes: T
    }>
  }
  
  export interface ServiceAttributes {
    title: string
    description: string
    price: number
    discount?: number
  }

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