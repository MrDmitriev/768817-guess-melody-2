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

const toggleGenreOption = (option) => ({
  type: `TOGGLE_GENRE`,
  payload: option,
});

export const resetFormData = () => ({
  type: `RESET_FORM`,
});

export const ActionCreator = {
  toggleGenreOption,
  resetFormData,
};

export const player = (state = initialState, action) => {
  switch (action.type) {
    case `TOGGLE_GENRE`:
      const newFormGuessGenre = Object.assign({}, state.formGuessGenre, {
        [action.payload]: !state.formGuessGenre[action.payload],
      });

      return Object.assign({}, state, {formGuessGenre: newFormGuessGenre});

    case `RESET_FORM`:
      return Object.assign({}, state, {
        formGuessGenre: initialState.formGuessGenre,
        formGuessArtist: initialState.formGuessArtist,
      });
  }

  return state;
};

export default player;
