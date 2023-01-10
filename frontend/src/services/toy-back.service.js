import { httpService } from './http.service.js';

const BASE_URL = 'toy/'

export const toyService = {
  query,
  get,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter
}


function query(filterBy) {
  const queryParams = `?name=${filterBy.name}&price=${filterBy.price}`
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

function getDefaultFilter() {
  return { name: '', inStock: '', labels: '' }
}
