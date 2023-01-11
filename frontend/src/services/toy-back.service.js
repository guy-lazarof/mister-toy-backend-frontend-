import { httpService } from './http.service.js';

const BASE_URL = 'toy/'

export const toyService = {
  query,
  get,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
}


function query(filterBy) {
  if (!filterBy) return httpService.get(BASE_URL)
  const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}`
  return httpService.get(BASE_URL + queryParams)
}

function getEmptyToy() {
  const toy = {
    name: '',
    price: '',
    labels: ['On wheels', 'Outdoor', 'Battery Powered'],
    createdAt: Date.now(),
    inStock: true
  }
  return toy
}


function get(toyId) {
  // return storageService.get(STORAGE_KEY, toyId)
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  // return storageService.remove(STORAGE_KEY, toyId)
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  }
  else {
    return httpService.post(BASE_URL, toy)
  }
}

function getFilterFromSearchParams(searchParams) {
  const emptyFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in emptyFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}


function getDefaultFilter() {
  return { name: '', inStock: '', labels: '' }
}
