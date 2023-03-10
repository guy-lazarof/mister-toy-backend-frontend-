// import { toyService } from '../services/toy.service(without.backend)';
import { toyService } from '../services/toy-back.service';


export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const SET_FILTER = 'SET_FILTER'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action) {
  let toys
  switch (action.type) {

    case SET_TOYS:
      return { ...state, toys: action.toys }
    case REMOVE_TOY:
      toys = state.toys.filter(t => t._id !== action.toyId)
      return { ...state, toys }
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy }
    case ADD_TOY:
      toys = [...state.toys, action.toy]
      return { ...state, toys }
    case UPDATE_TOY:
      toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
      return { ...state, toys }

    default:
      return state
  }
}