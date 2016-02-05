/**
 * Created by faide on 2016-02-04. © Varafy
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const initialState = {
  string: '',
  caret: 0,
  currentNode: 0,
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

const logResult = store => next => action => {
  console.group();
  console.log('dispatching', action);
  const result = next(action);
  console.log('result:', store.getState());
  console.groupEnd();
  return result;
};

let store = createStore(
  editor,
  initialState,
  compose(
    applyMiddleware(logResult),
      (window.devToolsExtension ? window.devToolsExtension() : f => f)
  ));

export default store;