import React from "react";
import PropTypes from 'prop-types';
import {getAuthorizationStatus, getAuthInfo} from './../../reducer/user/selectors';
import {connect} from 'react-redux';
import {AuthorizationStatus, CurrentPage, AppRoute} from "../../common/consts";
import {getCurrentPage} from './../../reducer/app/selectors';
import {Link} from "react-router-dom";
import {ActionCreator} from "../../reducer/app/app";

const Header = (props) => {
  const {authorizationStatus, authInfo, currentPage, children, onMylistClick} = props;

  const getHeaderClass = () => {
    return currentPage === (CurrentPage.MYLIST || CurrentPage.LOGIN) ?
      `user-page__head` :
      `movie-card__head`;
  };

  return (
    <header className={`page-header ${getHeaderClass()}`}>
      <div className="logo">
        <a className="logo__link" href={currentPage === CurrentPage.MAIN ? `#` : `main.html`}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {children}

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH ?
          <div className="user-block__avatar">
            <Link to={AppRoute.MYLIST} onClick={onMylistClick}><img src={authInfo.avatar} alt="User avatar" width="63" height="63"/></Link>
          </div> :
          <div className="user-block">
            <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
          </div>}

      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.shape({
    avatar: PropTypes.string.isRequired
  }),
  currentPage: PropTypes.string.isRequired,
  children: PropTypes.node,
  onMylistClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
  currentPage: getCurrentPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  onMylistClick() {
    dispatch(ActionCreator.changePage(CurrentPage.MYLIST));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
