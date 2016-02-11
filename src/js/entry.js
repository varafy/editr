/**
 * Created by faide on 2016-02-04. © Varafy
 */

import '!style!css!sass!../css/main.scss';
import editor from './editor';
import {identity, upperCase} from 'lodash';
import keysight from 'keysight';

const charset = /\S/;
const escapedEntities = {
  ' ': 'nbsp',
};

const routeKeyEvent = function(e) {
  const key = keysight(e);
  const conditionalCapitalize = (key) => ((e.shiftKey && key.char === key.key) ? upperCase : identity)(key.char);
  if (e.keyCode === 8) {
    editor.dispatch({type: 'REMOVECHAR'});
    return false;
  } else if (!keysight.unprintableKeys.includes(key.char) && !e.ctrlKey) {
    editor.dispatch({
      type: 'ADDCHAR',
      char: conditionalCapitalize(key)
    });
    return false;
  }
};

document.onkeydown = routeKeyEvent;

const renderString = function(str) {
  return str.replace(/ /g, '&' + escapedEntities[' '] + ';');
};

const val = document.getElementById('container');
const range = document.createRange();
const selection = window.getSelection();

editor.subscribe(() => {
  const { string, currentNode, caret } = editor.getState();
  // TODO: UNSAFE
  val.innerHTML = renderString(string);
  if (caret === 0) return;
  range.setStart(val.childNodes[currentNode], caret);
  range.collapse();
  selection.removeAllRanges();
  selection.addRange(range);
});

window.val = val;
window.range = range;
window.selection = selection;
window.keysight = keysight;
window.identity = identity;
window.upperCase = upperCase;