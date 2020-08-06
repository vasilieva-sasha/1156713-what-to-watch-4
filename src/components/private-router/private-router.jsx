import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../common/consts";
import {getAuthorizationStatus} from './../../reducer/user/selectors';

const PrivateRoute = (props) => {
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

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export default connect(mapStateToProps)(PrivateRoute);
