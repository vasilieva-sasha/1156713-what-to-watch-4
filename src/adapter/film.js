const filmAdapter = (film) => ({
  id: film.id,
  title: film.name,
  genre: film.genre,
  releaseDate: film.released,
  runtime: film.run_time,
  poster: film.preview_image,
  posterInfo: film.poster_image,
  background: film.background_image,
  backgroundColor: film.background_color,
  preview: film.preview_video_link,
  video: film.video_link,
  rating: {
    score: film.rating,
    level: `Very good`,
    count: film.scores_count
  },
  text: film.description,
  director: film.director,
  actors: film.starring,
  reviews: [0, 1],
  isFavorite: film.is_favorite
});

export default filmAdapter;
