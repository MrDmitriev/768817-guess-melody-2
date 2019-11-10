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

export const ActionCreator = {
  incrementStep,
  incrementMistake,
  toggleGenreOption,
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
  }

  return state;
};
