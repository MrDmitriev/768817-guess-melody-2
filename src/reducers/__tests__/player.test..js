import player from '../player.js';

const initialState = {
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
    const newState = player(initialState, action);

    expect(newState).toEqual(initialState);
  });


  it(`should toggle genre option in formGenreOption on opposite value`, () => {
    const action = {type: `TOGGLE_GENRE`, payload: `answer2`};
    const newFormGuessGenre = Object.assign({}, initialState.formGuessGenre, {"answer2": true});
    const expectedState = Object.assign({}, initialState, {formGuessGenre: newFormGuessGenre});

    const newState = player(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
