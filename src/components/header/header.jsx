import React from "react";
import PropTypes from 'prop-types';
import {getAuthorizationStatus, getAuthInfo} from './../../reducer/user/selectors';
import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer/app/app";
import {AuthorizationStatus, CurrentPage} from "../../common/consts";
import {getCurrentPage} from './../../reducer/app/selectors';

const Header = (props) => {
  const {authorizationStatus, onLoginClick, authInfo, currentPage} = props;
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link" href={currentPage === CurrentPage.MAIN ? `#` : `main.html`}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH ?
          <div className="user-block__avatar">
            <img src={authInfo.avatar} alt="User avatar" width="63" height="63"/>
          </div> :
          <div className="user-block">
            <a href="sign-in.html" className="user-block__link" onClick={onLoginClick}>Sign in</a>
          </div>}

      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  authInfo: PropTypes.shape({
    avatar: PropTypes.string.isRequired
  }),
  currentPage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
  currentPage: getCurrentPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick(evt) {
    evt.preventDefault();
    dispatch(ActionCreator.changePage(CurrentPage.LOGIN));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
