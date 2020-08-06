import * as React from "react";
import FilmInfoNavigation from "../film-info-navigation/film-info-navigation";
import FilmList from "../film-list/film-list";
import {SIMILAR_FILMS_AMOUNT_SHOW, AuthorizationStatus, AppRoute, CurrentPage} from "../../common/consts";
import withActiveNavigationScreen from "../../hocs/with-active-navigation-screen/with-active-navigation-screen";
import Header from '../header/header';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {connect} from "react-redux";
import MyListButton from '../my-list-button/my-list-button';
import {Link} from "react-router-dom";
import LoadingScreen from '../loading-screen/loading-screen';
import {Operations} from "../../reducer/data/data";
import Footer from "../footer/footer";
import {Film} from "../../types";

interface Props {
  films: Array<Film>;
  film: Film;
  authorizationStatus: string;
  loadReviews: (film: Film) => void;
}

const FilmInfoNavigationWrapped = withActiveNavigationScreen(FilmInfoNavigation);

class FilmInfo extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this._getFilmListByGenre = this._getFilmListByGenre.bind(this);
  }

  componentDidMount() {
    const {film, loadReviews} = this.props;
    if (film) {
      loadReviews(film);
    }
  }

  componentDidUpdate(prevProps) {
    const {film, loadReviews} = this.props;
    if (film !== prevProps.film) {
      loadReviews(film);
    }
  }
  _getFilmListByGenre() {
    const {films, film} = this.props;

    return films.filter((filmItem) => {
      return filmItem.genre === film.genre && filmItem.title !== film.title;
    }).slice(0, SIMILAR_FILMS_AMOUNT_SHOW);
  }

  render() {
    const {film, authorizationStatus} = this.props;
    return (
      film
        ? <React.Fragment>
          <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={film.background} alt={film.title}/>
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header currentPage={CurrentPage.INFO} />

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{film.title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{film.genre}</span>
                    <span className="movie-card__year">{film.releaseDate}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <Link to={`${AppRoute.FILM}/${film.id}${AppRoute.PLAYER}`} className="btn btn--play movie-card__button" type="button" >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </Link>
                    <MyListButton film={film} />
                    {authorizationStatus === AuthorizationStatus.AUTH ? <Link to={`${AppRoute.FILM}/${film.id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button" >Add review</Link> : ``}
                  </div>
                </div>
              </div>
            </div>

            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <div className="movie-card__poster movie-card__poster--big">
                  <img src={film.posterInfo} alt={`${film.title} poster`}
                    width="218" height="327"/>
                </div>

                <FilmInfoNavigationWrapped film={film} />

              </div>
            </div>
          </section>

          <div className="page-content">
            {this._getFilmListByGenre().length > 0
              ? <section className="catalog catalog--like-this">
                <h2 className="catalog__title">More like this</h2>

                <FilmList shownFilms={this._getFilmListByGenre()} genre={film.genre}/>
              </section>
              : ``}

            <Footer />
          </div>
        </React.Fragment>
        : <LoadingScreen/>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews(film) {
    dispatch(Operations.loadReviews(film));
  }
});

export {FilmInfo};
export default connect(mapStateToProps, mapDispatchToProps)(FilmInfo);
