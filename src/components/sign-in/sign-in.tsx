import * as React from "react";
import Footer from '../footer/footer';
import Header from '../header/header';
import {CurrentPage} from '../../common/consts';

interface Props {
  onSubmit: (authData: {
    login: string;
    password: string;
  }) => void;
  signInError: boolean;
}

class SignIn extends React.PureComponent<Props, {}> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
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
          <form action="#" className="sign-in__form" onSubmit={this.handleSubmit}>
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

export default SignIn;
