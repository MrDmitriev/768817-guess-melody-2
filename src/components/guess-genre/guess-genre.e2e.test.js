import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GuessGenre} from './guess-genre.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`simulates click event for button components`, () => {
  const onUserAnswer = jest.fn();
  const props = {
    onAnswer: onUserAnswer,
    currentQuestion: {
      type: `genre`,
      genre: `rock`,
      answers: [1, 2, 3],
    },
  };

  const expectedParam = {
    answer1: true,
    answer2: false,
    answer3: false,
    answer4: false,
  };

  const wrapper = shallow(<GuessGenre {...props} />);

  wrapper.find(`input`).first().simulate(`change`, {target: {value: `answer1`}});
  wrapper.find(`button`).last().simulate(`click`);

  expect(onUserAnswer).toHaveBeenCalledWith(expectedParam);
});


