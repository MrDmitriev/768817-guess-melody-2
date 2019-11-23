import createAPI from './api/api.js';

const initialState = {
  questions: [],
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

const incrementMistake = (currentQuestion, userAnswers, mistakes, mistakesLimit) => {
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
  return {
    type,
    payload: answerCorrect ? 0 : 1,
  };
};

const incrementStep = (stepsLimit) => ({
  type: `INCREMENT_STEP`,
  payload: stepsLimit,
});

const toggleGenreOption = (option) => ({
  type: `TOGGLE_GENRE`,
  payload: option,
});

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

export const loadQuestions = () => (dispatch, getState, api) => {
  console.log(`start load`, api);
  return api.get(`/questions`)
  .then((response) => {
    console.log(`response`, response);
  });
};

export const ActionCreator = {
  incrementStep,
  incrementMistake,
  toggleGenreOption,
  tick,
  showLoseTime,
  // setQuestions,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      const nextStep = state.step + 1;
      return Object.assign({}, state, {
        step: nextStep >= action.payload ? -1 : nextStep,
        formGuessGenre: initialState.formGuessGenre,
      });
    case `INCREMENT_MISTAKE`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });
    case `TOGGLE_GENRE`:
      const newFormGuessGenre = Object.assign({}, state.formGuessGenre, {
        [action.payload]: !state.formGuessGenre[action.payload],
      });

      return Object.assign({}, state, {formGuessGenre: newFormGuessGenre});
    case `RESET`:
      return initialState;

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
  }

  return state;
};
