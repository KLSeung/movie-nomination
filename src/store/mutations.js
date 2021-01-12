const mutations = {
  UPDATE_MOVIES(state, movies) {
    state.filteredMovieList = movies
  },
  EMPTY_MOVIE_LIST(state) {
    state.filteredMovieList = []
  },
  UPDATE_PAGE_LENGTH(state, length) {
    state.totalPageLength = length
  }
}

export default mutations