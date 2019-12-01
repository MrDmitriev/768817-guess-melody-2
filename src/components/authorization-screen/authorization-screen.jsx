import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/index.js';
import {checkAutorization} from '../../reducers/player.js';

export class AuthorizationScreen extends PureComponent {
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.login();
    };

    const handleChange = (e) => {
      const {updatefieldValue} = this.props;
      const fieldName = e.currentTarget.name;
      const value = e.currentTarget.value;
      updatefieldValue(fieldName, value);
    };

    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
        <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
        <form className="login__form" action="" onSubmit={handleSubmit}>
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input className="login__input" type="text" name="name" id="name" onChange={handleChange} />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input" type="text" name="password" id="password" onChange={handleChange} />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button
            className="login__button button"
            type="submit"
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
        <button className="replay" type="button">Сыграть ещё раз</button>
      </section>
    );
  }
}

AuthorizationScreen.propTypes = {
  updatefieldValue: PropTypes.func,
  login: PropTypes.func
};

export default connect(
    null,
    (dispatch) => ({
      updatefieldValue: (fieldName, value) => dispatch(ActionCreator.updatefieldValue(fieldName, value)),
      login: () => dispatch(checkAutorization()),
    })
)(AuthorizationScreen);
