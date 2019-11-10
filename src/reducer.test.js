import {reducer} from './reducer.js';

const initialState = {
  mistakes: null,
  mistakesLimit: 3,
  step: -1,
  stepsLimit: 2,
  gameTime: 5,
  formGuessGenre: {
    "answer1": false,
    "answer2": false,
    "answer3": false,
    "answer4": false,
  },
  formGuessArtist: {
    choosedArtist: ``,
  },
  timer: {
    min: 5,
    sec: 0,
    secLeft: 300,
  }
};

describe(`reducer works correctly`, () => {
  it(`should return initialState, when no parametres`, () => {
    const action = {};
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should increment step by a given value`, () => {
    const action = {type: `INCREMENT_STEP`, payload: 1};
    const expectedState = Object.assign({}, initialState, {step: 0});

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should increment mistake by a given value`, () => {
    const action = {type: `INCREMENT_MISTAKE`, payload: 1};
    const expectedState = Object.assign({}, initialState, {mistakes: 1});

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should toggle genre option in formGenreOption on opposite value`, () => {
    const action = {type: `TOGGLE_GENRE`, payload: `answer2`};
    const newFormGuessGenre = Object.assign({}, initialState.formGuessGenre, {"answer2": true});
    const expectedState = Object.assign({}, initialState, {formGuessGenre: newFormGuessGenre});

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should reset store, when get reach mistakesLimit`, () => {
    const prevState = {
      mistakes: 3,
      mistakesLimit: 3,
      step: 2,
      stepsLimit: 2,
      gameTime: 5,
      formGuessGenre: {
        "answer1": false,
        "answer2": true,
        "answer3": false,
        "answer4": false,
      },
      formGuessArtist: {
        choosedArtist: ``,
      },
      timer: {
        min: 5,
        sec: 0,
        secLeft: 300,
      }
    };
    const action = {type: `RESET`};
    const newState = reducer(prevState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should set a given time`, () => {
    const action = {type: `SET_TIME`, payload: {min: 1, sec: 33, newSecLeft: 93}};
    const newTimer = Object.assign({}, initialState.timer, {min: 1, sec: 33, secLeft: 93});
    const expectedState = Object.assign({}, initialState, {timer: newTimer});

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should reset timer`, () => {
    const prevState = {
      mistakes: 3,
      mistakesLimit: 3,
      step: 2,
      stepsLimit: 2,
      gameTime: 5,
      formGuessGenre: {
        "answer1": false,
        "answer2": true,
        "answer3": false,
        "answer4": false,
      },
      formGuessArtist: {
        choosedArtist: ``,
      },
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
      formGuessGenre: {
        "answer1": false,
        "answer2": true,
        "answer3": false,
        "answer4": false,
      },
      formGuessArtist: {
        choosedArtist: ``,
      },
      timer: {
        min: 5,
        sec: 0,
        secLeft: 300,
      }
    };

    const newState = reducer(prevState, action);

    expect(newState).toEqual(expectedState);
  });
});
