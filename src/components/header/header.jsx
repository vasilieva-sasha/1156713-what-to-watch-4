import React from "react";
import PropTypes from 'prop-types';
import {getAuthorizationStatus, getAuthInfo} from './../../reducer/user/selectors';
import {connect} from 'react-redux';
import {AuthorizationStatus, CurrentPage, AppRoute} from "../../common/consts";
import {Link} from "react-router-dom";

const Header = (props) => {
  const {authorizationStatus, authInfo, currentPage, children} = props;

  const getHeaderClass = () => {
    return currentPage === (CurrentPage.MYLIST || CurrentPage.LOGIN) ?
      `user-page__head` :
      `movie-card__head`;
  };

  return (
    <header className={`page-header ${getHeaderClass()}`}>
      <div className="logo">
        {currentPage === CurrentPage.MAIN ?
          <a className="logo__link" href="#">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a> :
          <Link to={AppRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        }
      </div>
      {children}

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH ?
          <div className="user-block__avatar">
            <Link to={AppRoute.MYLIST}><img src={authInfo.avatar} alt="User avatar" width="63" height="63"/></Link>
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
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
});

export default connect(mapStateToProps)(Header);
