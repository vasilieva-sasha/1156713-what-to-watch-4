import React, {PureComponent, createRef} from "react";
import Footer from './../footer/footer';
import PropTypes from 'prop-types';
import Header from './../header/header';
import {CurrentPage} from './../../common/consts';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = createRef();
    this._passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this._loginRef.current.value,
      password: this._passwordRef.current.value,
    });
  }

  render() {
    const {signInError} = this.props;

    return (
      <div className="user-page">
        <Header currentPage={CurrentPage.LOGIN}>
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
            {signInError ?
              <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div> :
              ``}
            <div className="sign-in__fields">
              <div className={`sign-in__field ${signInError ? `sign-in__field--error` : ``}`}>
                <input className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this._loginRef}
                  required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this._passwordRef}
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
  signInError: PropTypes.bool.isRequired
};

export default SignIn;
