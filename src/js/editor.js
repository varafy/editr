/**
 * Created by faide on 2016-02-04. © Varafy
 */
"use strict";

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createSelector } from 'reselect';

const getSelection = (state) => state.selection;
const select = createSelector(getSelection, (selection) => selection);

const rowDefault = {
  id: 0,
  type: 'text',
  content: ''
};

const selectionDefault = {
  startRow: 0,
  startOffset: 0,
  endRow: 0,
  endOffset: 0
};

const initialState = {
  rows: [],
  selection: {}
};

// ROWS REDUCERS
function addRow(state, action) {
  return state;
}

function removeRow(state, action) {
  return state;
};

function selection(state = selectionDefault, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function rows(state = [], action) {
  switch (action.type) {
    case 'ADDROW':
      return addRow(state, action);
    case 'REMOVEROW':
      return removeRow(state, action);
    case 'ADDCHARS':
    case 'REMOVECHARS':
      return rowReduce(state, action);
    default:
      return state;
  }
}

function rowReduce(state = rowDefault, action) {

}

const logResult = store => next => action => {
  console.group();
  console.log('dispatching', action);
  const result = next(action);
  console.log('result:', store.getState());
  console.groupEnd();
  return result;
};

const editorReducer = combineReducers({
  rows, selection
})

let store = createStore(
  editorReducer,
  initialState,
  compose(
    applyMiddleware(logResult),
      (window.devToolsExtension ? window.devToolsExtension() : f => f)
  ));

console.log(select(initialState));

export default store;