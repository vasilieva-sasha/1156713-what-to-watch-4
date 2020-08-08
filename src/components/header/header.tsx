import * as React from "react";
import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors';
import {connect} from 'react-redux';
import {AuthorizationStatus, CurrentPage, AppRoute} from "../../common/consts";
import {Link} from "react-router-dom";
import {AuthData} from "../../types";

interface Props {
  authorizationStatus: string;
  authInfo?: AuthData | null;
  currentPage: string;
  children?: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, authInfo, currentPage, children} = props;
  const avatar = authInfo ? authInfo.avatar : ``;

  const getHeaderClass = () => {
    return currentPage === CurrentPage.MYLIST || currentPage === CurrentPage.LOGIN ?
      `user-page__head` :
      `movie-card__head`;
  };

  const getUserBlock = () => {
    if (currentPage !== CurrentPage.LOGIN) {
      return (
        <div className="user-block">
          {authorizationStatus === AuthorizationStatus.AUTH ?
            <div className="user-block__avatar">
              <Link to={AppRoute.MYLIST}><img src={avatar} alt="User avatar" width="63" height="63"/></Link>
            </div> :
            <div className="user-block">
              <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
            </div>}

        </div>);
    }

    return null;
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

      {getUserBlock()}

    </header>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
