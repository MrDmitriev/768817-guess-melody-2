import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GuessGenre} from './guess-genre.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`simulates click event for button components`, () => {
  const incrementMistake = jest.fn();
  const toggleGenreOption = jest.fn();
  const incrementStep = jest.fn();
  const props = {
    currentQuestion: {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `AAA`,
          genre: `rock`,
        },
      ],
    },
    formGuessGenre: {
      "answer1": false,
    },
    stepsLimit: 2,
    mistakes: null,
    mistakesLimit: 3,
    incrementMistake,
    toggleGenreOption,
    incrementStep,
  };

  const expectedParam = `answer1`;

  const wrapper = shallow(<GuessGenre {...props} />);

  wrapper.find(`input`).first().simulate(`change`, {target: {value: `answer1`}});
  wrapper.find(`button`).last().simulate(`click`);

  expect(toggleGenreOption).toHaveBeenCalledWith(expectedParam);
});


