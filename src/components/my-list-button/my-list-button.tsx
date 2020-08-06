import * as React from "react";
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {AuthorizationStatus, AppRoute} from "../../common/consts";
import history from '../../history';
import {connect} from "react-redux";
import {Operations} from "../../reducer/data/data";
import {Film} from "../../types";

interface Props {
  film: Film;
  handleChangeFavoriteStatus: (film: Film) => void;
  authorizationStatus: string;
}


const MyListButton: React.FunctionComponent<Props> = (props: Props) => {
  const {film, handleChangeFavoriteStatus, authorizationStatus} = props;

  const hanleFavoriteClick = () => {
    return authorizationStatus === AuthorizationStatus.AUTH ?
      handleChangeFavoriteStatus(film) :
      history.push(AppRoute.SIGN_IN);
  };

  return (
    <button className="btn btn--list movie-card__button" type="button" onClick={hanleFavoriteClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {film.isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
    </button>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeFavoriteStatus(film) {
    dispatch(Operations.changeFavoriteStatus(film));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
