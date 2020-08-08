import * as React from "react";
import Footer from "../footer/footer";
import {CurrentPage, AuthorizationStatus} from '../../common/consts';
import {Header} from '../header/header';

const LoadErrorScreen: React.FunctionComponent = () => {
  return (
    <div className="user-page">
      <Header currentPage={CurrentPage.LOGIN} authorizationStatus={AuthorizationStatus.NO_AUTH}>

        <h1 className="page-title user-page__title">Server Error</h1>
      </Header>
      <div style={{margin: `auto`}}>
        <p>Could not reach server. Please try again later</p>
      </div>

      <Footer />
    </div>
  );
};

export default LoadErrorScreen;
