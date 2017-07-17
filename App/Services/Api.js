// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.apiBaseUrl) => {
  const api = apisauce.create({
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getPoiByBbox = (data) => api.post('getPoiByBbox', data)

  return {
    getPoiByBbox
  }
}

// let's return back our create method as the default.
export default {
  create
}
