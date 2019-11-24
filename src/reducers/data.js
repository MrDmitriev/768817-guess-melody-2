import {setStepsLimit} from './game.js';

const initialState = {
  questions: []
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

export const ActionCreator = {
  setQuestions,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case `SET_QUESTIONS`:
      return Object.assign({}, state, {questions: action.payload});
  }

  return state;
};

export default data;
