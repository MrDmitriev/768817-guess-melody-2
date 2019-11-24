import game from '../game.js';

const initialState = {
  mistakes: null,
  mistakesLimit: 3,
  step: -1,
  stepsLimit: 2,
  gameTime: 5,
  timer: {
    min: 5,
    sec: 0,
    secLeft: 300,
  }
};

describe(`reducer works correctly`, () => {
  it(`should return initialState, when no parametres`, () => {
    const action = {};
    const newState = game(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should increment step on a given value`, () => {
    const action = {type: `INCREMENT_STEP`, payload: 1};
    const expectedState = Object.assign({}, initialState, {step: 1});

    const newState = game(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should increment mistake by a given value`, () => {
    const action = {type: `INCREMENT_MISTAKE`, payload: 1};
    const expectedState = Object.assign({}, initialState, {mistakes: 1});

    const newState = game(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should reset store, when get reach mistakesLimit`, () => {
    const prevState = {
      mistakes: 3,
      mistakesLimit: 3,
      step: 2,
      stepsLimit: 2,
      gameTime: 5,
      timer: {
        min: 5,
        sec: 0,
        secLeft: 300,
      }
    };
    const action = {type: `RESET`};
    const newState = game(prevState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should set a given time`, () => {
    const action = {type: `SET_TIME`, payload: {min: 1, sec: 33, newSecLeft: 93}};
    const newTimer = Object.assign({}, initialState.timer, {min: 1, sec: 33, secLeft: 93});
    const expectedState = Object.assign({}, initialState, {timer: newTimer});

    const newState = game(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should reset timer`, () => {
    const prevState = {
      mistakes: 3,
      mistakesLimit: 3,
      step: 2,
      stepsLimit: 2,
      gameTime: 5,
      timer: {
        min: 0,
        sec: 0,
        secLeft: 0,
      }
    };
    const action = {type: `RESET_TIME`};
    const expectedState = {
      mistakes: 3,
      mistakesLimit: 3,
      step: 2,
      stepsLimit: 2,
      gameTime: 5,
      timer: {
        min: 5,
        sec: 0,
        secLeft: 300,
      }
    };

    const newState = game(prevState, action);

    expect(newState).toEqual(expectedState);
  });
});
