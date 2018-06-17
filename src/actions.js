export default (dispatch, {history}) => {
  return {
    headActions: {
      mount (payload) {
        dispatch({
          type: '@@app/mount-head',
          payload
        })
      }
    }
  }
}
