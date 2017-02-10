export default function(state = {}, action) {
  switch (action.type) {
    case 'HOME_ADD':
      return Object.assign({}, state, { count: action.count });
    default:
      return state;
  }
}
