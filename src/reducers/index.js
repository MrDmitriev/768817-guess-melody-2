import {combineReducers} from 'redux';
import game from './game';
import data from './data';
import player from './player';

import {ActionCreator as gameActionCreator} from './game.js';
import {ActionCreator as dataActionCreator} from './data.js';
import {ActionCreator as playerActionCreator} from './player.js';

export const ActionCreator = Object.assign(
    gameActionCreator,
    dataActionCreator,
    playerActionCreator
);

export default combineReducers({
  game,
  data,
  player
});
