import * as React from "react";
import Footer from "../footer/footer";
import {CurrentPage, AuthorizationStatus} from '../../common/consts';
import {Header} from '../header/header';

const LoadingScreen: React.FunctionComponent = () => {
  return (
    <div className="user-page">
      <Header currentPage={CurrentPage.LOGIN} authorizationStatus={AuthorizationStatus.NO_AUTH}/>
      <div style={{margin: `auto`}}>
        <p>Loading....</p>
      </div>

      <Footer currentPage={CurrentPage.MAIN} />
    </div>
  );
};

export default LoadingScreen;
