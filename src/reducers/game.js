import {getCurrentStep, getStepsLimit, getMistakes, getMistakesLimit} from '../selectors/game.js';
import {resetFormData} from './player.js';

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

const incrementMistake = (currentQuestion, userAnswers) => (dispatch, getState) => {
  const mistakes = getMistakes(getState());
  const mistakesLimit = getMistakesLimit(getState());

  let type = `INCREMENT_MISTAKE`;
  let answerCorrect = true;

  if (currentQuestion.type === `genre`) {
    const genre = currentQuestion.genre;
    const answerOptions = currentQuestion.answers;
    const userAnswersValues = Object.values(userAnswers);
    answerOptions.forEach((item, i) => {
      const rightAnswer = answerOptions[i].genre === genre;
      const userAnswer = userAnswersValues[i];
      if (rightAnswer !== userAnswer) {
        answerCorrect = false;
      }
    });

  } else {
    const rightAnswer = currentQuestion.song.artist;
    const userAnswer = userAnswers;
    answerCorrect = rightAnswer === userAnswer;
  }

  if (!answerCorrect) {
    type = mistakes + 1 === mistakesLimit ? `RESET` : `INCREMENT_MISTAKE`;
  }
  dispatch({
    type,
    payload: answerCorrect ? 0 : 1,
  });
};

const incrementStep = () => (dispatch, getState) => {
  const currentStep = getCurrentStep(getState());
  const nextStep = currentStep + 1;
  const stepsLimit = getStepsLimit(getState());

  const newStepValue = nextStep > stepsLimit ? -1 : nextStep;
  dispatch({
    type: `INCREMENT_STEP`,
    payload: newStepValue,
  });
  dispatch(resetFormData());
};

const tick = (timer) => {
  const {secLeft} = timer;
  const newSecLeft = secLeft - 1;

  const type = newSecLeft < 0 ? `RESET_TIME` : `SET_TIME`;

  const sec = newSecLeft % 60;
  const min = Math.floor(newSecLeft / 60);

  return {
    type,
    payload: {
      min,
      sec,
      newSecLeft,
    }
  };
};

const showLoseTime = () => {
  return {
    type: `LOOSE_TIME`,
    payload: {step: -2},
  };
};

export const setStepsLimit = (stepsLimit) => ({
  type: `SET_STEPS_LIMIT`,
  payload: stepsLimit
});

export const ActionCreator = {
  incrementStep,
  incrementMistake,
  tick,
  showLoseTime,
  setStepsLimit,
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: action.payload,
        formGuessGenre: initialState.formGuessGenre,
      });

    case `INCREMENT_MISTAKE`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case `SET_STEPS_LIMIT`:
      return Object.assign({}, state, {stepsLimit: action.payload});

    case `SET_TIME`:
      const newTimer = Object.assign({}, state.timer, {
        min: action.payload.min,
        sec: action.payload.sec,
        secLeft: action.payload.newSecLeft,
      });

      return Object.assign({}, state, {
        timer: newTimer,
      });

    case `RESET_TIME`:
      const initialTimer = Object.assign({}, state.timer, {
        min: initialState.timer.min,
        sec: initialState.timer.sec,
        secLeft: initialState.timer.secLeft,
      });

      return Object.assign({}, state, {
        timer: initialTimer,
      });

    case `LOOSE_TIME`:
      return Object.assign({}, state, {step: action.payload.step});

    case `RESET`:
      return initialState;
  }

  return state;
};

export default game;
