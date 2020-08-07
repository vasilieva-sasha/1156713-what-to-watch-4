import {Film} from "../types";

export const noop = () => {
  // Mock function for test props
};

export const film: Film = {
  id: 3,
  title: `a`,
  genre: `Drama`,
  releaseDate: 2018,
  runtime: 200,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  backgroundColor: `rgba`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: {
    score: 8.9,
    count: 240
  },
  text: ``,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: false
};

export const films: Array<Film> = [
  {
    id: 1,
    title: `a`,
    genre: `Drama`,
    releaseDate: 2018,
    runtime: 200,
    poster: `fantastic-beasts-the-crimes-of-grindelwald`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_animals`,
    backgroundColor: `rgba`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: 8.9,
      count: 240
    },
    text: ``,
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    isFavorite: false
  },
  {
    id: 2,
    title: `b`,
    genre: `Drama`,
    releaseDate: 2018,
    runtime: 200,
    poster: `fantastic-beasts-the-crimes-of-grindelwald`,
    posterInfo: `posters/placeimg_218_327_animals`,
    background: `background/placeimg_1000_424_animals`,
    backgroundColor: `rgba`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: 8.9,
      count: 240
    },
    text: ``,
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    isFavorite: true
  }
];
