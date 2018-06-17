import clone from 'clone'
import initialState from './initial-state'

export default (state = initialState, action) => {
  state = clone(state)
  if (action.type === '@@app/mount-head') {
    if (action.payload.key === 'head') {
      state.head.dimensions = {
        top: action.payload.top,
        height: action.payload.height
      }
    } else {
      state.head.items.forEach(item => {
        if (item.icon === action.payload.key) {
          item.dimensions = {
            top: action.payload.top,
            height: action.payload.height
          }
        }
      })
    }
  }
  return state
}
