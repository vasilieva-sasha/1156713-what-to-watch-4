import {reducer, ActionCreator, ActionType, getFilteredFilms} from "./reducer.js";
import {ALL_GENRES} from "../common/consts.js";
import {getGenres} from "../common/utils.js";

const Genres = {
  DRAMA: `Drama`,
  COMEDY: `Comedy`,
  HORROR: `Horror`
};

const films = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Drama`,
    releaseDate: 2018,
    runtime: 100,
    poster: `fantastic-beasts-the-crimes-of-grindelwald`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_animals`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [0, 1]
  }, {
    title: `Bohemian Rhapsody`,
    genre: `Comedia`,
    releaseDate: 2018,
    runtime: 100,
    poster: `bohemian-rhapsody`,
    posterInfo: `posters/placeimg_218_327_arch`,
    background: `background/placeimg_1000_424_any`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [1, 3, 4, 6, 7]
  }, {
    title: `Macbeth`,
    genre: `Drama`,
    releaseDate: 2014,
    runtime: 80,
    poster: `macbeth`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_arch`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [3, 4]
  }, {
    title: `Aviator`,
    genre: `Crime`,
    releaseDate: 2010,
    runtime: 110,
    poster: `aviator`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_grayscale_animals`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [2, 3, 4, 5]
  }, {
    title: `We need to talk about Kevin`,
    genre: `Horror`,
    releaseDate: 2012,
    runtime: 130,
    poster: `we-need-to-talk-about-kevin`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_grayscale_tech`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [0, 1, 3, 4, 5, 6, 7]
  }, {
    title: `What We Do in the Shadows`,
    genre: `Drama`,
    releaseDate: 2014,
    runtime: 90,
    poster: `what-we-do-in-the-shadows`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_tech`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [0, 1]
  }, {
    title: `Revenant`,
    genre: `Drama`,
    releaseDate: 2014,
    runtime: 100,
    poster: `revenant`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_nature`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [0, 1]
  }, {
    title: `Johnny English`,
    genre: `Drama`,
    releaseDate: 2014,
    runtime: 65,
    poster: `johnny-english`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_tech2`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [0, 1]
  }, {
    title: `Bohemian Rhapsody`,
    genre: `Comedia`,
    releaseDate: 2018,
    runtime: 100,
    poster: `bohemian-rhapsody`,
    posterInfo: `posters/placeimg_218_327_arch`,
    background: `background/placeimg_1000_424_any`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [1, 3, 4, 6, 7]
  }, {
    title: `Macbeth`,
    genre: `Drama`,
    releaseDate: 2014,
    runtime: 80,
    poster: `macbeth`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_arch`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [3, 4]
  }, {
    title: `Aviator`,
    genre: `Crime`,
    releaseDate: 2010,
    runtime: 110,
    poster: `aviator`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_grayscale_animals`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [2, 3, 4, 5]
  }, {
    title: `We need to talk about Kevin`,
    genre: `Horror`,
    releaseDate: 2012,
    runtime: 130,
    poster: `we-need-to-talk-about-kevin`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_grayscale_tech`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8,9`,
      level: `Very good`,
      count: 240
    },
    text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    reviews: [0, 1, 3, 4, 5, 6, 7]
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCard: null,
    genre: ALL_GENRES,
    genres: getGenres(films),
    films,
    filteredFilms: films
  });
});

it(`Reducer should change current genre`, () => {
  expect(reducer({
    activeCard: null,
    genre: ALL_GENRES,
    genres: getGenres(films),
    films,
    filteredFilms: films
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.DRAMA,
  })).toEqual({
    activeCard: null,
    genre: Genres.DRAMA,
    genres: getGenres(films),
    films,
    filteredFilms: films
  });

  expect(reducer({
    activeCard: null,
    genre: ALL_GENRES,
    genres: getGenres(films),
    films,
    filteredFilms: films
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.COMEDY,
  })).toEqual({
    activeCard: null,
    genre: Genres.COMEDY,
    genres: getGenres(films),
    films,
    filteredFilms: films
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(Genres.HORROR)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: Genres.HORROR,
    });
  });

  it(`Action creator for getting new film list returns correct action`, () => {
    expect(ActionCreator.getFilmsList(Genres.HORROR)).toEqual({
      type: ActionType.GET_FILMS_LIST,
      payload: getFilteredFilms(films, Genres.HORROR)
    });
  });
});
