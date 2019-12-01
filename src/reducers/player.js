import {getAuthFormData} from '../selectors/player.js';
import {setAuthResponse} from './data.js';

const initialState = {
  isAuthorizationRequired: true,
  authForm: {},
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

const requireAuthorization = (isAuthorizationRequired) => ({
  type: `REQUIRE_AUTHORIZATION`,
  payload: isAuthorizationRequired
});

export const checkAutorization = () => (dispatch, getState, api) => {
  const formData = getAuthFormData(getState());
  const {name, password} = formData;

  if (!name || !password) {
    return false;
  }
  return api.post(`/login`, {
    email: name,
    password,
  })
  .then((response) => {
    dispatch(setAuthResponse(response.data));
    dispatch(requireAuthorization(false));
  });
};

const updatefieldValue = (fieldName, value) => ({
  type: `UPDATE_FIELD_VALUE`,
  payload: {
    fieldName,
    value
  }
});

export const ActionCreator = {
  toggleGenreOption,
  resetFormData,
  requireAuthorization,
  updatefieldValue,
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

    case `REQUIRE_AUTHORIZATION`:
      return Object.assign({}, state, {isAuthorizationRequired: action.payload});

    case `UPDATE_FIELD_VALUE`:
      const {fieldName, value} = action.payload;
      const authForm = Object.assign({}, state.authForm, {[fieldName]: value});
      return Object.assign({}, state, {authForm});
  }

  return state;
};

export default player;
