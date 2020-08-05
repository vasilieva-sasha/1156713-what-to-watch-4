import React, {PureComponent, createRef} from "react";
import Footer from './../footer/footer';
import PropTypes from 'prop-types';
import Header from './../header/header';
import {CurrentPage} from './../../common/consts';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {singInError} = this.props;

    return (
      <div className="user-page">
        <Header currentPage={CurrentPage.LOGIN}>
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>
        {/* <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>


        </header> */}

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
            {singInError ?
              <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div> :
              ``}
            <div className="sign-in__fields">
              <div className={`sign-in__field ${singInError ? `sign-in__field--error` : ``}`}>
                <input className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.loginRef}
                  required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordRef}
                  required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" >Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }

}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  singInError: PropTypes.bool.isRequired
};

export default SignIn;
