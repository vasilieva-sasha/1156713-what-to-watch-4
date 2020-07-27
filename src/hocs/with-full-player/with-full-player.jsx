import React from "react";
import PropTypes from 'prop-types';
import {getPlayerStatus} from "../../reducer/app/selectors";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {connect} from "react-redux";

const withFullPlayer = (Component) => {
  const WithFullPlayer = (props) => {
    const {isPlayerActive, onPlayClick} = props;

    return (
      <Component
        {...props}
        isPlayerActive={isPlayerActive}
        onPlayClick={() => {
          onPlayClick();
        }}
      />
    );
  };

  WithFullPlayer.propTypes = {
    isPlayerActive: PropTypes.bool,
    onPlayClick: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    isPlayerActive: getPlayerStatus(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onPlayClick() {
      dispatch(AppActionCreator.changePlayerStatus(true));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFullPlayer);
};

export default withFullPlayer;
