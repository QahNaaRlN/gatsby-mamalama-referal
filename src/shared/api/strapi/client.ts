export const getStrapiURL = (path: string = '') => {
    const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337'
    return `${strapiUrl}${path}`
  }
  
  export const fetchStrapiAPI = async <T>(
    path: string,
    urlParamsObject = {},
    options = {}
  ): Promise<T> => {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      ...options,
    }
  
    const queryString = new URLSearchParams(urlParamsObject).toString()
    const url = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`
  
    const response = await fetch(url, mergedOptions)
    const data = await response.json()
    return data
  }