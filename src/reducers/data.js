import {setStepsLimit} from './game.js';

const initialState = {
  questions: [],
  responses: {
    auth: {}
  }
};

const setQuestions = (questions) => {
  return {
    type: `SET_QUESTIONS`,
    payload: questions
  };
};

export const loadQuestions = () => (dispatch, getState, api) => {
  return api.get(`/questions`)
  .then((response) => {
    dispatch(setQuestions(response.data));
    dispatch(setStepsLimit(response.data.length));
  });
};

export const setAuthResponse = (response) => ({
  type: `SET_AUTH_RESPONSE`,
  payload: response
});

export const ActionCreator = {
  setQuestions,
  setAuthResponse,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case `SET_QUESTIONS`:
      return Object.assign({}, state, {questions: action.payload});
    case `SET_AUTH_RESPONSE`:
      const responses = Object.assign({}, state.responses, {auth: action.payload});
      return Object.assign({}, state, {responses});
  }

  return state;
};

export default data;
