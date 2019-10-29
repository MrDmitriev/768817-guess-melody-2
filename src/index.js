import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';
import {questions} from './mocks/questions';
import {settings} from './mocks/settings';

const init = () => {
  ReactDOM.render(
      <App
        gameTime={settings.gameTime}
        errorCount={settings.errorCount}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init();

