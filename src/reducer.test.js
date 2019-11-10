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
};

describe(`reducer works correctly`, () => {
  it(`should return initialState, when no parametres`, () => {
    const action = {};
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should increment step by a given value`, () => {
    const action = {type: `INCREMENT_STEP`, payload: 1};
    const expectedState = {
      mistakes: null,
      mistakesLimit: 3,
      step: 0,
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
    };
    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should increment mistake by a given value`, () => {
    const action = {type: `INCREMENT_MISTAKE`, payload: 1};
    const expectedState = {
      mistakes: 1,
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
    };
    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it(`should toggle genre option in formGenreOption on opposite value`, () => {
    const action = {type: `TOGGLE_GENRE`, payload: `answer2`};
    const expectedState = {
      mistakes: null,
      mistakesLimit: 3,
      step: -1,
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
    };
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
    };
    const action = {type: `RESET`};
    const newState = reducer(prevState, action);

    expect(newState).toEqual(initialState);
  });
});
