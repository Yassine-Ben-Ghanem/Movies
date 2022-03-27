const intialState = { favoriteFilm: [] };

function toggleFavorite(state = intialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoriteFilm.findIndex(
        (item) => item.id === action.value.id
      );
      if (favoriteFilmIndex != -1) {
        nextState = {
          ...state,
          favoriteFilm: state.favoriteFilm.filter(
            (item, index) => index !== favoriteFilmIndex
          ),
        };
      } else {
        nextState = {
          ...state,
          favoriteFilm: [...state.favoriteFilm, action.value],
        };
      }
      return nextState || state;
    default:
      return {
        favoriteFilm: state.favoriteFilm,
      };
  }
}

export default toggleFavorite;
