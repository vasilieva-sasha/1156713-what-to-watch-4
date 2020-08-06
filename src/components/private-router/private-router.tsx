import * as React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../common/consts";
import {getAuthorizationStatus} from '../../reducer/user/selectors';

interface Props {
  exact: boolean;
  path: string;
  render: (routeProps) => void;
  authorizationStatus: string;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, exact, path, render} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
          routeProps.history.push(path);

          return <Redirect to={AppRoute.SIGN_IN} />;
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
