/**
 * Created by faide on 2016-02-04. © Varafy
 */

import { createStore } from 'redux';

const initialState = {
  string: '',
  caret: 0,
  currentNode: 0
};

function addChar(state, action) {
  return Object.assign({}, state, {
    string: state.string.slice(0, state.caret) + action.char + state.string.slice(state.caret),
    caret: state.caret + 1
  });
}

function removeChar(state, action) {
  return Object.assign({}, state, {
    string: state.string.slice(0, state.caret - 1) + state.string.slice(state.caret),
    caret: Math.max(0, state.caret - 1),
  });
}



function editor(state = '', action) {
  switch (action.type) {
    case 'ADDROW':
      return addRow(state, action);
    case 'ADDCHAR':
      return addChar(state, action);
    case 'REMOVECHAR':
      return removeChar(state, action);
    default:
      return state;
  }
}

let store = createStore(editor, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);

export default store;