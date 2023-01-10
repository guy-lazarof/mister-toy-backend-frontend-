import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  get,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter
}

_createToys()

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

function query(filterBy) {
  return storageService.query(STORAGE_KEY)
    .then(toys => {
      let filterToys = toys
      if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filterToys = toys.filter(t => regex.test(t.name))
      }
      if (filterBy.inStock === 'forSale') {
        filterToys = toys.filter(t => t.inStock === true)
      }
      return filterToys
    })
}


function get(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function getDefaultFilter() {
  return { name: '', inStock: '', labels: '' }
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys) {
    toys = [
      {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true
      }, {
        _id: 't102',
        name: 'Dragon puzzle',
        price: 52,
        labels: ['Box game', 'Art', 'Puzzle'],
        createdAt: 1631031801011,
        inStock: true
      }, {
        _id: 't103',
        name: 'Blue Dog',
        price: 85,
        labels: ['On wheels', 'Box game', 'Art'],
        createdAt: 1631031801011,
        inStock: true
      }, {
        _id: 't104',
        name: 'Playstation',
        price: 100,
        labels: ['Baby', 'Doll', 'Puzzle'],
        createdAt: 1631031801011,
        inStock: true
      }, {
        _id: 't105',
        name: 'football',
        price: 75,
        labels: ['Outdoor', 'Battery Powered'],
        createdAt: 1631031801011,
        inStock: false
      }
    ]
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}

