import * as React from "react";
import {RouterProps} from 'react-router';
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../common/consts";
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import LoadingScreen from './../loading-screen/loading-screen';

interface Props {
  exact: boolean;
  path: string;
  render: (routeProps: RouterProps) => React.ReactNode;
  authorizationStatus: string;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, exact, path, render} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        switch (authorizationStatus) {
          case (null):
            return <LoadingScreen />;
          case (AuthorizationStatus.NO_AUTH):
            return <Redirect to={AppRoute.SIGN_IN} />;
          case (AuthorizationStatus.AUTH):
            return render(routeProps);
        }
        return render(routeProps);
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export default connect(mapStateToProps)(PrivateRoute);
