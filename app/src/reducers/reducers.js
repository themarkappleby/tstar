const reducers = (state, action) => {
  switch (action.type) {
    case 'SET_STORY':
      return Object.assign({}, state, {storyId: action.payload})
    default:
      return state
  }
}

export default reducers
